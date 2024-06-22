// backend/src/controllers/userController.js

const User = require('../models/User');  // Assuming User model is defined

// Example controller methods
const userController = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the user already exists
      let existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create a new user instance
      const newUser = new User({
        username,
        email,
        password  // In a real application, ensure to hash the password securely
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();

      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (err) {
      console.error('Error fetching user by ID:', err);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  // Update user information
  updateUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const { username, email } = req.body;

      const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  // Delete user by ID
  deleteUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
};

module.exports = userController;
