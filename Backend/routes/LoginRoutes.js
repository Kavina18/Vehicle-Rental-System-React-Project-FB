const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Middleware to parse JSON
router.use(express.json());

//Model
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'vendor', 'customer'] },
}, { collection: 'SignUP_Details' }));

// Login route
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Username, password, and role are required' });
  }

  try {
    const user = await User.findOne({ username, role });
    if (!user) {
      console.log('Invalid username or role');
      return res.status(401).json({ error: 'Invalid username or role' });
    }

    if (password !== user.password) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid password' });
    }
    console.log('Login successful');
    res.status(200).json({ success: 'Login successful', user: { username: user.username, role: user.role } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
