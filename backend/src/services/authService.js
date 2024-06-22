const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model defined

// Function to register a new user
async function registerUser(userData) {
    try {
        // Check if user already exists
        let existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create new user instance
        const newUser = new User({
            email: userData.email,
            password: hashedPassword,
            // Add other relevant fields here
        });

        // Save user to database
        await newUser.save();

        return { message: 'User registered successfully' };
    } catch (error) {
        throw new Error(`Error registering user: ${error.message}`);
    }
}

// Function to log in a user
async function loginUser(credentials) {
    try {
        // Find user by email
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
            throw new Error('User not found');
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = generateAuthToken(user);

        return { token };
    } catch (error) {
        throw new Error(`Error logging in user: ${error.message}`);
    }
}

// Function to generate JWT token
function generateAuthToken(user) {
    const token = jwt.sign(
        { userId: user._id, email: user.email }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );
    return token;
}

// Function to log out a user (if needed, can be handled client-side with token expiration)
async function logoutUser() {
    // Add logic here if needed
    // Typically, JWT tokens are stateless and clients manage token expiration
}

// Function to refresh JWT token (if needed)
async function refreshToken() {
    // Add logic here if needed
    // Typically, refresh tokens are used for extending the validity of JWT tokens
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
};
