const Web3 = require('web3');

// Replace with your Ethereum provider URL
const providerUrl = 'YOUR_ETHEREUM_PROVIDER_URL';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// ABI of the IERC20 interface (replace with actual ABI)
const ERC20ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "name": "", "type": "uint8" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }],
        "name": "allowance",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }],
        "name": "approve",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }],
        "name": "transferFrom",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }],
        "name": "Transfer",
        "type": "event"
    }
];

// Replace with the address of the ERC20 token you want to interact with
const tokenAddress = '0x123abc...';

// Create a contract instance
const erc20Contract = new web3.eth.Contract(ERC20ABI, tokenAddress);

module.exports = {
    getContract: function () {
        return erc20Contract;
    },

    // Example method: Get token name
    getTokenName: async function () {
        try {
            const name = await erc20Contract.methods.name().call();
            return name;
        } catch (error) {
            console.error('Error fetching token name:', error);
            throw error;
        }
    },

    // Example method: Transfer tokens
    transferTokens: async function (toAddress, amount) {
        try {
            const accounts = await web3.eth.getAccounts();
            const txHash = await erc20Contract.methods.transfer(toAddress, amount).send({ from: accounts[0] });
            return txHash;
        } catch (error) {
            console.error('Error transferring tokens:', error);
            throw error;
        }
    }
};
