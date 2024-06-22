const Allegra = require('allegra-sdk');
const fs = require('fs');

// Load Allegra configurations
const allegraConfig = require('../config/allegraConfig');

// Initialize Allegra SDK
const allegra = new Allegra(allegraConfig);

// Placeholder for order storage contract instance
let orderStorageContract;

// Function to store an order in the decentralized storage
async function storeOrder(orderDetails) {
    try {
        // Initialize contract instance if not already initialized
        if (!orderStorageContract) {
            const contractAddress = await getContractAddress(); // Fetch contract address
            orderStorageContract = new allegra.Contract({
                abi: allegraConfig.orderStorageABI,  // Replace with actual ABI
                address: contractAddress,
            });
        }

        // Add order to the blockchain storage
        const txReceipt = await orderStorageContract.methods.storeOrder(orderDetails).send({
            from: allegraConfig.deployerAddress,
            gasLimit: 500000,  // Adjust gas limit as necessary
        });

        console.log('Order stored successfully.');
        console.log('Transaction receipt:', txReceipt.transactionHash);
    } catch (error) {
        console.error('Error storing order:', error);
    }
}

// Function to fetch the contract address (Replace with actual implementation)
async function getContractAddress() {
    // Placeholder for fetching contract address from configuration or blockchain
    return allegraConfig.orderStorageContractAddress; // Replace with actual address or fetching logic
}

module.exports = {
    storeOrder,
};
