const Web3 = require('web3');
const Transaction = require('../models/transaction'); 
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL)); // RPC URL of your Ethereum node

// Function to send a transaction to the blockchain
async function sendTransaction(txData) {
    try {
        // Unlock account to send transaction
        await web3.eth.personal.unlockAccount(txData.from, txData.password, null);

        // Create transaction object
        const txObject = {
            from: txData.from,
            to: txData.to,
            value: web3.utils.toHex(web3.utils.toWei(txData.amount.toString(), 'ether')),
            gas: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(await web3.eth.getGasPrice())
        };

        // Send transaction
        const txHash = await web3.eth.sendTransaction(txObject);

        // Save transaction details to database (optional)
        await saveTransactionToDB(txHash, txData);

        return { txHash };
    } catch (error) {
        throw new Error(`Error sending transaction: ${error.message}`);
    }
}

// Function to save transaction details to database (example)
async function saveTransactionToDB(txHash, txData) {
    try {
        const newTransaction = new Transaction({
            txHash,
            from: txData.from,
            to: txData.to,
            amount: txData.amount
            // Add other relevant fields here
        });
        await newTransaction.save();
    } catch (error) {
        console.error(`Error saving transaction to DB: ${error.message}`);
    }
}

// Function to get transaction receipt from the blockchain
async function getTransactionReceipt(txHash) {
    try {
        const receipt = await web3.eth.getTransactionReceipt(txHash);
        return receipt;
    } catch (error) {
        throw new Error(`Error getting transaction receipt: ${error.message}`);
    }
}

module.exports = {
    sendTransaction,
    getTransactionReceipt
};
