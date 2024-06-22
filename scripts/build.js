// build.js

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Clean up previous build
fs.removeSync('dist'); // Assuming 'dist' is your build output directory

// Transpile TypeScript files
console.log('Transpiling TypeScript...');
execSync('npx tsc'); // Assumes TypeScript is already configured (tsconfig.json)

// Copy necessary files to build directory
console.log('Copying static assets...');
fs.copySync('public', 'dist/public'); // Assuming 'public' is where your static assets reside

// Copy backend files
console.log('Copying backend files...');
fs.copySync('backend/src', 'dist/src');

// Copy LASR programs
console.log('Copying LASR programs...');
fs.copySync('lasr-programs/src', 'dist/lasr-programs/src');

// Copy scripts
console.log('Copying scripts...');
fs.copySync('scripts', 'dist/scripts');

// Copy config files
console.log('Copying config files...');
fs.copySync('config', 'dist/config');

// Copy documentation
console.log('Copying documentation...');
fs.copySync('docs', 'dist/docs');

// Optionally, copy additional files as needed...

console.log('Build completed successfully!');
