// routes/authRoutes.js
const express = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// models/User.js
const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the user's password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare the password for login
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Replace with environment variable in production

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    localStorage.setItem('token', token); // Set token in localstorage

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    localStorage.setItem('token', token); // Set token in localstorage

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  localStorage.removeItem('token'); // Clear the localstorage
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
