const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Middleware to parse JSON
router.use(express.json());

// User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'vendor', 'customer'] }, // Add role field
}, { collection: 'SignUP_Details' });

const User = mongoose.model('User', userSchema);

// Insert new user route
router.put('/signup', async (req, res) => {
  const { username, password, role } = req.body; 
  try {
    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Username, password, and role are required' });
    }

    const existingUser = await User.findOne({ username, role });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with the same role' });
    }

    // Create a new user
    const newUser = new User({ username, password, role });
    await newUser.save();
    console.log('New user added:', newUser);
    res.status(201).json({success:'New user added:', user: newUser });
  } catch (error) {
    console.error('Error adding new user:', error);
    res.status(400).json({ error: 'Error adding new user', details: error.message });
  }
});

module.exports = router;
