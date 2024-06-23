interface IAllegraPair {
    // Events
    // These are optional and can be omitted in JavaScript if not used directly
    // event Approval(address indexed owner, address indexed spender, uint value);
    // event Transfer(address indexed from, address indexed to, uint value);
    // event Mint(address indexed sender, uint amount0, uint amount1);
    // event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
    // event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to);
    // event Sync(uint112 reserve0, uint112 reserve1);

    // View functions
    name(): Promise<string>;
    symbol(): Promise<string>;
    decimals(): Promise<number>;
    totalSupply(): Promise<number>;
    balanceOf(owner: string): Promise<number>;
    allowance(owner: string, spender: string): Promise<number>;

    // State-changing functions
    approve(spender: string, value: number): Promise<boolean>;
    transfer(to: string, value: number): Promise<boolean>;
    transferFrom(from: string, to: string, value: number): Promise<boolean>;

    DOMAIN_SEPARATOR(): Promise<Uint8Array>;
    PERMIT_TYPEHASH(): Promise<Uint8Array>;
    nonces(owner: string): Promise<number>;

    permit(owner: string, spender: string, value: number, deadline: number, v: number, r: Uint8Array, s: Uint8Array): Promise<void>;

    MINIMUM_LIQUIDITY(): Promise<number>;
    factory(): Promise<string>;
    token0(): Promise<string>;
    token1(): Promise<string>;
    getReserves(): Promise<{ reserve0: number, reserve1: number, blockTimestampLast: number }>;
    price0CumulativeLast(): Promise<number>;
    price1CumulativeLast(): Promise<number>;
    kLast(): Promise<number>;

    mint(to: string): Promise<number>;
    burn(to: string): Promise<{ amount0: number, amount1: number }>;
    swap(amount0Out: number, amount1Out: number, to: string, data: Uint8Array): Promise<void>;
    skim(to: string): Promise<void>;
    sync(): Promise<void>;

    initialize(token0: string, token1: string): Promise<void>;
}

export default IAllegraPair;
