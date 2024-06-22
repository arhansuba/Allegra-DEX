// deploy.js

const { execSync } = require('child_process');
const path = require('path');

// Deploy frontend
console.log('Deploying frontend...');
try {
  execSync('cd frontend && npm run build'); // Example command, adjust as per your setup
  console.log('Frontend deployed successfully!');
} catch (error) {
  console.error('Error deploying frontend:', error);
  process.exit(1);
}

// Deploy backend
console.log('Deploying backend...');
try {
  execSync('cd backend && npm run deploy'); // Example command, adjust as per your setup
  console.log('Backend deployed successfully!');
} catch (error) {
  console.error('Error deploying backend:', error);
  process.exit(1);
}

// Deploy LASR programs
console.log('Deploying LASR programs...');
try {
  execSync('cd lasr-programs && npm run deploy'); // Example command, adjust as per your setup
  console.log('LASR programs deployed successfully!');
} catch (error) {
  console.error('Error deploying LASR programs:', error);
  process.exit(1);
}

// Additional deployments for other components...

console.log('Deployment process completed!');
