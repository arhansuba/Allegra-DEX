interface IAllegraFactory {
    // Events
    // These are optional and can be omitted in JavaScript if not used directly
    // event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    // View functions
    feeTo(): Promise<string>;
    feeToSetter(): Promise<string>;
    getPair(tokenA: string, tokenB: string): Promise<string>;
    allPairs(index: number): Promise<string>;
    allPairsLength(): Promise<number>;

    // State-changing functions
    createPair(tokenA: string, tokenB: string): Promise<string>;
    setFeeTo(address: string): Promise<void>;
    setFeeToSetter(address: string): Promise<void>;
}

export default IAllegraFactory;
