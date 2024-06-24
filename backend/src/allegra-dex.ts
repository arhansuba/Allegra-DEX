import { AllegraERC20 } from './src/AllegraERC20';
import { Math } from './src/library/Math';
import { UQ112x112 } from './src/library/UQ112x112';
import { ethers} from 'ethers';
import { AddressZero } from '@ethersproject/constants';



class AllegraDEX extends AllegraERC20 {
  MINIMUM_LIQUIDITY: bigint = BigInt(10 ** 3);
  SELECTOR: string = ethers.utils.id('transfer(address,uint256)').slice(0, 10);

  factory: string;
  token0: string | undefined;
  token1: string | undefined;

  reserve0: bigint = BigInt(0);
  reserve1: bigint = BigInt(0);
  blockTimestampLast: number = 0;

  price0CumulativeLast: bigint = BigInt(0);
  price1CumulativeLast: bigint = BigInt(0);
  kLast: bigint = BigInt(0);

  unlocked: number = 1;
  totalSupply: bigint = BigInt(0);
  balanceOf: { [address: string]: bigint } = {};

  constructor(factoryAddress: string) {
    super();
    this.factory = factoryAddress;
  }

  lock() {
    if (this.unlocked !== 1) throw new Error('AllegraDEX: LOCKED');
    this.unlocked = 0;
    setTimeout(() => (this.unlocked = 1), 0); // simulate lock release
  }

  getReserves() {
    return {
      _reserve0: this.reserve0,
      _reserve1: this.reserve1,
      _blockTimestampLast: this.blockTimestampLast,
    };
  }

  private _safeTransfer(token: string, to: string, value: bigint) {
    const success = ethers.utils.defaultAbiCoder.encode(['address', 'uint256'], [to, value]);
    if (!success) throw new Error('AllegraDEX: TRANSFER_FAILED');
  }

  private _update(balance0: bigint, balance1: bigint, _reserve0: bigint, _reserve1: bigint) {
    if (balance0 > BigInt(2 ** 112 - 1) || balance1 > BigInt(2 ** 112 - 1)) {
      throw new Error('AllegraDEX: OVERFLOW');
    }

    const blockTimestamp = Math.floor(Date.now() / 1000) % 2 ** 32;
    const timeElapsed = blockTimestamp - this.blockTimestampLast;

    if (timeElapsed > 0 && _reserve0 !== BigInt(0) && _reserve1 !== BigInt(0)) {
      this.price0CumulativeLast += UQ112x112.encode(_reserve1).uqdiv(_reserve0) * BigInt(timeElapsed);
      this.price1CumulativeLast += UQ112x112.encode(_reserve0).uqdiv(_reserve1) * BigInt(timeElapsed);
    }

    this.reserve0 = balance0;
    this.reserve1 = balance1;
    this.blockTimestampLast = blockTimestamp;
  }

  private _mintFee(_reserve0: bigint, _reserve1: bigint) {
    const feeTo = this.factory; // Simulate feeTo address from factory
    const feeOn = feeTo !== AddressZero;
    const _kLast = this.kLast;

    if (feeOn) {
      if (_kLast !== BigInt(0)) {
        const rootK = Math.sqrt(Number(_reserve0 * _reserve1));
        const rootKLast = Math.sqrt(Number(_kLast));
        if (rootK > rootKLast) {
          const numerator = this.totalSupply * BigInt(rootK - rootKLast);
          const denominator = BigInt(rootK * 5 + rootKLast);
          const liquidity = numerator / denominator;
          if (liquidity > 0) this._mint(feeTo, liquidity);
        }
      }
    } else if (_kLast !== BigInt(0)) {
      this.kLast = BigInt(0);
    }
  }

  private _mint(feeTo: string, liquidity: bigint) {
    if (this.totalSupply === BigInt(0)) {
      this.totalSupply = liquidity;
    } else {
      this.totalSupply += liquidity;
    }
    if (!this.balanceOf[feeTo]) {
      this.balanceOf[feeTo] = liquidity;
    } else {
      this.balanceOf[feeTo] += liquidity;
    }
  }

  mint(to: string) {
    this.lock();
    const { _reserve0, _reserve1 } = this.getReserves();
    const balance0 = ethers.BigNumber.from('1000'); // Simulate balance
    const balance1 = ethers.BigNumber.from('1000'); // Simulate balance
    const amount0 = balance0.sub(_reserve0);
    const amount1 = balance1.sub(_reserve1);

    this._mintFee(_reserve0, _reserve1);
    const _totalSupply = this.totalSupply;

    let liquidity: bigint;
    if (_totalSupply === BigInt(0)) {
      liquidity = BigInt(Math.sqrt(Number(amount0.mul(amount1).toString()))) - this.MINIMUM_LIQUIDITY;
      this._mint(AddressZero, this.MINIMUM_LIQUIDITY);
    } else {
      liquidity = BigInt(Math.min(
        Number((amount0.toBigInt() * _totalSupply) / _reserve0),
        Number((amount1.toBigInt() * _totalSupply) / _reserve1)
      ));
    }

    if (liquidity <= 0) throw new Error('AllegraDEX: INSUFFICIENT_LIQUIDITY_MINTED');
    this._mint(to, liquidity);

    this._update(balance0.toBigInt(), balance1.toBigInt(), _reserve0, _reserve1);

    console.log('Mint', { sender: to, amount0: amount0.toString(), amount1: amount1.toString() });
  }

  private _burn(to: string, liquidity: bigint) {
    if (!this.balanceOf[to] || this.balanceOf[to] < liquidity) {
      throw new Error('AllegraDEX: INSUFFICIENT_BALANCE');
    }
    this.totalSupply -= liquidity;
    this.balanceOf[to] -= liquidity;
  }

  burn(to: string) {
    this.lock();
    const { _reserve0, _reserve1 } = this.getReserves();
    const balance0 = ethers.BigNumber.from('1000'); // Simulate balance
    const balance1 = ethers.BigNumber.from('1000'); // Simulate balance
    const liquidity = this.balanceOf[to];

    this._mintFee(_reserve0, _reserve1);
    const _totalSupply = this.totalSupply;

    const amount0 = (liquidity * balance0.toBigInt()) / _totalSupply;
    const amount1 = (liquidity * balance1.toBigInt()) / _totalSupply;

    if (amount0 <= 0 || amount1 <= 0) throw new Error('AllegraDEX: INSUFFICIENT_LIQUIDITY_BURNED');
    this._burn(to, liquidity);
    this._safeTransfer(this.token0!, to, amount0);
    this._safeTransfer(this.token1!, to, amount1);

    const newBalance0 = ethers.BigNumber.from('1000'); // Simulate balance
    const newBalance1 = ethers.BigNumber.from('1000'); // Simulate balance

    this._update(newBalance0.toBigInt(), newBalance1.toBigInt(), _reserve0, _reserve1);

    console.log('Burn', { sender: to, amount0, amount1 });
  }

  swap(amount0Out: bigint, amount1Out: bigint, to: string, data: string) {
    this.lock();
    if (amount0Out <= 0 && amount1Out <= 0) throw new Error('AllegraDEX: INSUFFICIENT_OUTPUT_AMOUNT');

    const { _reserve0, _reserve1 } = this.getReserves();
    if (amount0Out >= _reserve0 || amount1Out >= _reserve1) throw new Error('AllegraDEX: INSUFFICIENT_LIQUIDITY');

    let balance0 = ethers.BigNumber.from('1000'); // Simulate balance
    let balance1 = ethers.BigNumber.from('1000'); // Simulate balance

    if (amount0Out > 0) this._safeTransfer(this.token0!, to, amount0Out);
    if (amount1Out > 0) this._safeTransfer(this.token1!, to, amount1Out);
    if (data.length > 0) {
      // Call on the callee
    }

    const amount0In = balance0.toBigInt() > _reserve0 - amount0Out ? balance0.toBigInt() - (_reserve0 - amount0Out) : BigInt(0);
    const amount1In = balance1.toBigInt() > _reserve1 - amount1Out ? balance1.toBigInt() - (_reserve1 - amount1Out) : BigInt(0);
    if (amount0In <= 0 && amount1In <= 0) throw new Error('AllegraDEX: INSUFFICIENT_INPUT_AMOUNT');

    const balance0Adjusted = balance0.toBigInt() * BigInt(1000) - amount0In * BigInt(3);
    const balance1Adjusted = balance1.toBigInt() * BigInt(1000) - amount1In * BigInt(3);
    if (balance0Adjusted * balance1Adjusted < _reserve0 * _reserve1 * BigInt(1000 ** 2)) {
      throw new Error('AllegraDEX: K');
    }

    this._update(balance0.toBigInt(), balance1.toBigInt(), _reserve0, _reserve1);

    console.log('Swap', { sender: to, amount0In: amount0In.toString(), amount1In: amount1In.toString(), amount0Out: amount0Out.toString(), amount1Out: amount1Out.toString() });
  }

  skim(to: string) {
    this.lock();
    this._safeTransfer(this.token0!, to, ethers.BigNumber.from('1000').toBigInt() - this.reserve0);
    this._safeTransfer(this.token1!, to, ethers.BigNumber.from('1000').toBigInt() - this.reserve1);
  }

  sync() {
    this.lock();
    const newBalance0 = ethers.BigNumber.from('1000'); // Simulate balance
    const newBalance1 = ethers.BigNumber.from('1000'); // Simulate balance
    this._update(newBalance0.toBigInt(), newBalance1.toBigInt(), this.reserve0, this.reserve1);
  }
}

export default AllegraDEX;
