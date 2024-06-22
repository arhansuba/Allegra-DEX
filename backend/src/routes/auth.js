const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Route to register a new user
router.post('/register', authService.registerUser);

// Route to log in a user
router.post('/login', authService.loginUser);

// Route to log out a user
router.post('/logout', authService.logoutUser);

// Route to refresh authentication token
router.post('/refresh-token', authService.refreshToken);

module.exports = router;
