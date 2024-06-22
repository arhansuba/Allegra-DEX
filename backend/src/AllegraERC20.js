const { BigNumber } = require('bignumber.js');
const { keccak256, defaultAbiCoder, toUtf8Bytes, solidityPack } = require('ethers').utils;

// SafeMath library for overflow-safe arithmetic
const SafeMath = {
    add: (x, y) => new BigNumber(x).plus(y),
    sub: (x, y) => new BigNumber(x).minus(y),
    mul: (x, y) => new BigNumber(x).times(y),
};

// Define the AllegraV2ERC20 contract
class AllegraERC20 {
    // Constructor
    constructor() {
        this.name = 'Allegra ';
        this.symbol = 'ALG';
        this.decimals = 18;
        this.totalSupply = new BigNumber(0);
        this.balanceOf = {};
        this.allowance = {};
        this.DOMAIN_SEPARATOR = '';
        this.PERMIT_TYPEHASH = '0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9';//PROABLY CHANGE THIS
        this.nonces = {};
        this.chainId = 1; // Replace with your actual chain ID

        this.initDomainSeparator();
    }

    // Initialize domain separator
    initDomainSeparator() {
        this.DOMAIN_SEPARATOR = keccak256(
            defaultAbiCoder.encode(
                ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
                [
                    keccak256(toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')),
                    keccak256(toUtf8Bytes(this.name)),
                    keccak256(toUtf8Bytes('1')),
                    this.chainId,
                    this.address,
                ]
            )
        );
    }

    // Internal function: mint tokens
    _mint(to, value) {
        this.totalSupply = SafeMath.add(this.totalSupply, value);
        this.balanceOf[to] = SafeMath.add(this.balanceOf[to] || new BigNumber(0), value);
    }

    // Internal function: burn tokens
    _burn(from, value) {
        this.balanceOf[from] = SafeMath.sub(this.balanceOf[from] || new BigNumber(0), value);
        this.totalSupply = SafeMath.sub(this.totalSupply, value);
    }

    // Internal function: approve spender
    _approve(owner, spender, value) {
        this.allowance[owner][spender] = value;
    }

    // Internal function: transfer tokens
    _transfer(from, to, value) {
        this.balanceOf[from] = SafeMath.sub(this.balanceOf[from] || new BigNumber(0), value);
        this.balanceOf[to] = SafeMath.add(this.balanceOf[to] || new BigNumber(0), value);
    }

    // External function: approve spender
    approve(spender, value) {
        this._approve(msg.sender, spender, value);
        return true;
    }

    // External function: transfer tokens
    transfer(to, value) {
        this._transfer(msg.sender, to, value);
        return true;
    }

    // External function: transfer tokens from
    transferFrom(from, to, value) {
        if (this.allowance[from][msg.sender] !== new BigNumber(-1)) {
            this.allowance[from][msg.sender] = SafeMath.sub(this.allowance[from][msg.sender] || new BigNumber(0), value);
        }
        this._transfer(from, to, value);
        return true;
    }

    // External function: permit spender to spend tokens
    permit(owner, spender, value, deadline, v, r, s) {
        require(deadline >= Math.floor(Date.now() / 1000), 'AllegraV2: EXPIRED');
        const digest = keccak256(
            solidityPack(
                ['bytes1', 'bytes1', 'bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256', 'uint256'],
                [
                    '0x19',
                    '0x01',
                    this.DOMAIN_SEPARATOR,
                    this.PERMIT_TYPEHASH,
                    owner,
                    spender,
                    value,
                    this.nonces[owner]++,
                    deadline,
                ]
            )
        );
        const recoveredAddress = ecrecover(digest, v, r, s);
        require(recoveredAddress !== ethers.constants.AddressZero && recoveredAddress === owner, 'Allegra: INVALID_SIGNATURE');
        this._approve(owner, spender, value);
    }
}

module.exports = AllegraERC20;
