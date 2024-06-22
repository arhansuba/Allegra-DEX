const { keccak256, defaultAbiCoder, toUtf8Bytes, solidityPack } = require('ethers').utils;

class AllegraPair {
    constructor() {
        this.MINIMUM_LIQUIDITY = 10**3;
        this.SELECTOR = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'; // bytes4(keccak256(bytes('transfer(address,uint256)')))
 // this.selector address is just number Its not right 
        this.factory = '';
        this.token0 = '';
        this.token1 = '';

        this.reserve0 = 0;
        this.reserve1 = 0;
        this.blockTimestampLast = 0;

        this.price0CumulativeLast = 0;
        this.price1CumulativeLast = 0;
        this.kLast = 0;

        this.unlocked = 1;
    }

    lock() {
        if (this.unlocked !== 1) {
            throw new Error('Allegra: LOCKED');
        }
        this.unlocked = 0;
    }

    unlock() {
        this.unlocked = 1;
    }

    getReserves() {
        return {
            reserve0: this.reserve0,
            reserve1: this.reserve1,
            blockTimestampLast: this.blockTimestampLast
        };
    }

    _safeTransfer(token, to, value) {
        // Replace with actual safe transfer logic
        // Example: web3.eth.sendTransaction({ to: token, from: fromAccount, value: amountToSend })
        // Example: token.transfer(to, value);
        console.log(`Transferring ${value} tokens of ${token} to ${to}`);
    }

    initialize(_token0, _token1) {
        if (msg.sender !== this.factory) {
            throw new Error('Allegra: FORBIDDEN');
        }
        this.token0 = _token0;
        this.token1 = _token1;
    }

    _update(balance0, balance1, _reserve0, _reserve1) {
        if (balance0 > 2**112 - 1 || balance1 > 2**112 - 1) {
            throw new Error('Allegra: OVERFLOW');
        }
        const blockTimestamp = Math.floor(Date.now() / 1000);
        const timeElapsed = blockTimestamp - this.blockTimestampLast;
        if (timeElapsed > 0 && _reserve0 !== 0 && _reserve1 !== 0) {
            this.price0CumulativeLast += (this.reserve1 << 112) / this.reserve0 * timeElapsed;
            this.price1CumulativeLast += (this.reserve0 << 112) / this.reserve1 * timeElapsed;
        }
        this.reserve0 = balance0;
        this.reserve1 = balance1;
        this.blockTimestampLast = blockTimestamp;
        console.log(`Reserves updated: reserve0=${this.reserve0}, reserve1=${this.reserve1}`);
    }

    _mintFee(_reserve0, _reserve1) {
        const feeTo = ''; // Replace with actual feeTo address retrieval
        const feeOn = feeTo !== '';
        if (feeOn) {
            const rootK = Math.sqrt(this.reserve0 * this.reserve1);
            const rootKLast = Math.sqrt(this.kLast);
            if (rootK > rootKLast) {
                const numerator = this.totalSupply * (rootK - rootKLast);
                const denominator = rootK * 5 + rootKLast;
                const liquidity = numerator / denominator;
                if (liquidity > 0) {
                    this._mint(feeTo, liquidity);
                    console.log(`Minted fee liquidity: ${liquidity}`);
                }
            }
        } else if (this.kLast !== 0) {
            this.kLast = 0;
        }
    }

    mint(to) {
        const { reserve0, reserve1 } = this.getReserves();
        const balance0 = ''; // Replace with actual balance retrieval
        const balance1 = ''; // Replace with actual balance retrieval
        const amount0 = balance0 - reserve0;
        const amount1 = balance1 - reserve1;

        const feeOn = this._mintFee(reserve0, reserve1);
        const totalSupply = this.totalSupply; // Replace with actual total supply retrieval
        let liquidity;
        if (totalSupply === 0) {
            liquidity = Math.sqrt(amount0 * amount1) - this.MINIMUM_LIQUIDITY;
            this._mint(address(0), this.MINIMUM_LIQUIDITY);
        } else {
            liquidity = Math.min(amount0 * totalSupply / reserve0, amount1 * totalSupply / reserve1);
        }
        if (liquidity <= 0) {
            throw new Error('Allegra: INSUFFICIENT_LIQUIDITY_MINTED');
        }
        this._mint(to, liquidity);
        this._update(balance0, balance1, reserve0, reserve1);
        if (feeOn) {
            this.kLast = this.reserve0 * this.reserve1;
        }
    }

    burn(to) {
        const { reserve0, reserve1 } = this.getReserves();
        const token0Balance = ''; // Replace with actual balance retrieval
        const token1Balance = ''; // Replace with actual balance retrieval
        const liquidity = this.balanceOf[address(this)];

        const feeOn = this._mintFee(reserve0, reserve1);
        const totalSupply = this.totalSupply; // Replace with actual total supply retrieval
        const amount0 = liquidity * token0Balance / totalSupply;
        const amount1 = liquidity * token1Balance / totalSupply;
        if (amount0 <= 0 || amount1 <= 0) {
            throw new Error('Allegra: INSUFFICIENT_LIQUIDITY_BURNED');
        }
        this._burn(address(this), liquidity);
        this._safeTransfer(this.token0, to, amount0);
        this._safeTransfer(this.token1, to, amount1);
        this._update(token0Balance, token1Balance, reserve0, reserve1);
        if (feeOn) {
            this.kLast = this.reserve0 * this.reserve1;
        }
    }

    swap(amount0Out, amount1Out, to, data) {
        if (amount0Out <= 0 && amount1Out <= 0) {
            throw new Error('Allegra: INSUFFICIENT_OUTPUT_AMOUNT');
        }
        const { reserve0, reserve1 } = this.getReserves();
        if (amount0Out >= reserve0 || amount1Out >= reserve1) {
            throw new Error('Allegra: INSUFFICIENT_LIQUIDITY');
        }

        const token0Balance = ''; // Replace with actual balance retrieval
        const token1Balance = ''; // Replace with actual balance retrieval
        this._safeTransfer(this.token0, to, amount0Out);
        this._safeTransfer(this.token1, to, amount1Out);
        if (data.length > 0) {
            this.IUniswapV2Callee(to).allegraV2Call(msg.sender, amount0Out, amount1Out, data);
        }
        const updatedToken0Balance = ''; // Replace with actual updated balance retrieval
        const updatedToken1Balance = ''; // Replace with actual updated balance retrieval
        const amount0In = updatedToken0Balance > reserve0 - amount0Out ? updatedToken0Balance - (reserve0 - amount0Out) : 0;
        const amount1In = updatedToken1Balance > reserve1 - amount1Out ? updatedToken1Balance - (reserve1 - amount1Out) : 0;
        if (amount0In <= 0 && amount1In <= 0) {
            throw new Error('Allegra: INSUFFICIENT_INPUT_AMOUNT');
        }
        const balance0Adjusted = token0Balance * 1000 - amount0In * 3;
        const balance1Adjusted = token1Balance * 1000 - amount1In * 3;
        if (balance0Adjusted * balance1Adjusted < reserve0 * reserve1 * 1000**2) {
            throw new Error('Allegra: K');
        }
        this._update(updatedToken0Balance, updatedToken1Balance, reserve0, reserve1);
    }

    skim(to) {
        const token0Balance = ''; // Replace with actual balance retrieval
        const token1Balance = ''; // Replace with actual balance retrieval
        this._safeTransfer(this.token0, to, token0Balance - this.reserve0);
        this._safeTransfer(this.token1, to, token1Balance - this.reserve1);
    }

    sync() {
        this._update(''); // Replace with actual balance retrieval
    }
}

module.exports = AllegraPair;
