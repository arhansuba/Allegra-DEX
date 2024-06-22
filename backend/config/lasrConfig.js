module.exports = {
    programs: {
      orderMatching: {
        name: 'Order Matching Program',
        entryPoint: './src/orderMatching.js',
        language: 'JavaScript',
        timeout: 30000, // in milliseconds
      },
      orderStorage: {
        name: 'Order Storage Program',
        entryPoint: './src/orderStorage.js',
        language: 'JavaScript',
        timeout: 30000, // in milliseconds
      },
      // Add more programs as needed
    },
    deployment: {
      strategy: 'blue-green',
      autoDeploy: true,
      rollbackOnFailure: true,
      maxDeployments: 5,
    },
    testing: {
      integrationTests: {
        enabled: true,
        testEnvironment: 'allegra-network',
      },
      stressTests: {
        enabled: true,
        testEnvironment: 'allegra-network',
      },
    },
  };
  