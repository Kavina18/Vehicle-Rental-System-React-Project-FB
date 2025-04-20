const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Middleware to parse JSON
router.use(express.json());

// User model
const userSchema = new mongoose.Schema({
  usermail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'vendor', 'customer'] },
}, { collection: 'SignUP_Details' });

const User = mongoose.model('User', userSchema);

// Insert new user route
router.put('/signup', async (req, res) => {
  const { usermail, password, role } = req.body; 
  try {
    if (!usermail || !password || !role) {
      return res.status(400).json({ error: 'Usermail, password, and role are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ usermail });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with the same mail id' });
    }

    // Create a new user
    const newUser = new User({ usermail, password, role });
    await newUser.save();
    console.log('New user added:', newUser);
    res.status(200).json({ success: 'New user added', user: newUser });
  } catch (error) {
    if (error.code === 11000) { 
      return res.status(400).json({ error: 'User already exists with the same mail id' });
    }
    console.error('Error adding new user:', error);
    res.status(500).json({ error: 'Error adding new user', details: error.message });
  }
});

module.exports = router;
