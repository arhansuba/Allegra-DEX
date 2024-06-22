// backend/config/allegraConfig.js

const allegraConfig = {
    protocol: 'https',                  // Protocol used by Allegra (https or http)
    host: 'allegra.example.com',        // Hostname where Allegra instance is running
    port: 443,                          // Port number for Allegra communication
    apiVersion: 'v1',                   // API version of Allegra to use
    timeout: 5000,                      // Timeout in milliseconds for API requests
    authToken: 'YOUR_AUTH_TOKEN_HERE'   // Authentication token for secure communication
  };
  
  module.exports = allegraConfig;
  