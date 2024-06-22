module.exports = {
    network: {
      name: 'Allegra Network',
      id: 'allegra-network-id',
      rpcUrl: 'https://allegra.rpc.url',
    },
    services: {
      CDN: {
        endpoint: 'https://cdn.allegra.network',
        apiKey: 'your-api-key',
      },
      DNS: {
        provider: 'Allegra DNS Provider',
        apiKey: 'your-api-key',
      },
      FaaS: {
        endpoint: 'https://faas.allegra.network',
        apiKey: 'your-api-key',
      },
      AutoScaling: {
        enabled: true,
        minInstances: 2,
        maxInstances: 10,
        instanceType: 't3.large',
      },
    },
  };
  