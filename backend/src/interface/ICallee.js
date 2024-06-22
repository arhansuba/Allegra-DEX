const ICallee = require('./ICallee');

async function main() {
    const calleeContract = ICallee.getContract();

    try {
        // Example: Handle Uniswap V2 call
        const sender = '0xsenderAddress'; // Replace with actual sender address
        const amount0 = '1000000000000000000'; // Replace with amount0 value
        const amount1 = '2000000000000000000'; // Replace with amount1 value
        const data = '0x123456'; // Replace with actual data
        const txHash = await ICallee.handleUniswapV2Call(sender, amount0, amount1, data);
        console.log('Transaction Hash:', txHash);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
