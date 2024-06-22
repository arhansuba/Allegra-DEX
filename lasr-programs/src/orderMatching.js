const Allegra = require('allegra-sdk');
const fs = require('fs');

// Load Allegra configurations
const allegraConfig = require('./config/allegraConfig');

// Initialize Allegra SDK
const allegra = new Allegra(allegraConfig);

// Function to deploy the order matching service
async function deployOrderMatching() {
    try {
        // Compile the order matching smart contract (Replace with actual compilation logic)
        const compiledContract = await compileOrderMatchingContract();

        // Deploy the contract
        const deploymentResult = await allegra.deployContract({
            contractName: 'OrderMatching',
            bytecode: compiledContract.bytecode,
            abi: compiledContract.abi,
            gasLimit: 5000000,  // Adjust gas limit as necessary
            privateKey: allegraConfig.privateKey,
        });

        // Save deployment information to a JSON file
        saveDeploymentInfo(deploymentResult);

        console.log('Order matching service deployed successfully.');
        console.log('Contract address:', deploymentResult.contractAddress);
    } catch (error) {
        console.error('Error deploying order matching service:', error);
    }
}

// Function to compile the order matching smart contract (Replace with actual compilation logic)
async function compileOrderMatchingContract() {
    // Placeholder for compilation logic
    // Example: Use a Solidity compiler or Allegra SDK's compilation methods
    const compiledContract = {
        bytecode: '0x1234...', // Replace with actual bytecode
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

    const filePath = './deployedContracts/orderMatchingDeployment.json';
    fs.writeFileSync(filePath, JSON.stringify(deploymentInfo, null, 2));
    console.log('Deployment information saved to:', filePath);
}

// Execute deployment process
deployOrderMatching();
