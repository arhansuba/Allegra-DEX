const Allegra = require('allegra-sdk');
const fs = require('fs');

// Load Allegra configurations
const allegraConfig = require('./config/allegraConfig');

// Initialize Allegra SDK
const allegra = new Allegra(allegraConfig);

// Function to deploy the order storage service
async function deployOrderStorage() {
    try {
        // Compile the order storage smart contract (Replace with actual compilation logic)
        const compiledContract = await compileOrderStorageContract();

        // Deploy the contract
        const deploymentResult = await allegra.deployContract({
            contractName: 'OrderStorage',
            bytecode: compiledContract.bytecode,
            abi: compiledContract.abi,
            gasLimit: 5000000,  // Adjust gas limit as necessary
            privateKey: allegraConfig.privateKey,
        });

        // Save deployment information to a JSON file
        saveDeploymentInfo(deploymentResult);

        console.log('Order storage service deployed successfully.');
        console.log('Contract address:', deploymentResult.contractAddress);
    } catch (error) {
        console.error('Error deploying order storage service:', error);
    }
}

// Function to compile the order storage smart contract (Replace with actual compilation logic)
async function compileOrderStorageContract() {
    // Placeholder for compilation logic
    // Example: Use a Solidity compiler or Allegra SDK's compilation methods
    const compiledContract = {
        bytecode: '0x5678...', // Replace with actual bytecode
        abi: [{...}],          // Replace with actual ABI
    };
    return compiledContract;
}

// Function to save deployment information to a JSON file
function saveDeploymentInfo(deploymentResult) {
    const deploymentInfo = {
        contractAddress: deploymentResult.contractAddress,
        transactionHash: deploymentResult.transactionHash,
        deployedBy: allegraConfig.deployerAddress,
        deploymentTime: new Date().toISOString(),
    };

    const filePath = './deployedContracts/orderStorageDeployment.json';
    fs.writeFileSync(filePath, JSON.stringify(deploymentInfo, null, 2));
    console.log('Deployment information saved to:', filePath);
}

// Execute deployment process
deployOrderStorage();
