interface IAllegraERC20{
    // Events
    // These are optional and can be omitted in JavaScript if not used directly
    // event Approval(address indexed owner, address indexed spender, uint value);
    // event Transfer(address indexed from, address indexed to, uint value);

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

    // Permit function (optional, can be omitted if not used)
    // DOMAIN_SEPARATOR(): Promise<string>;
    // PERMIT_TYPEHASH(): Promise<string>;
    // nonces(owner: string): Promise<number>;
    // permit(owner: string, spender: string, value: number, deadline: number, v: number, r: string, s: string): Promise<void>;
}
export default IAllegraERC20;
