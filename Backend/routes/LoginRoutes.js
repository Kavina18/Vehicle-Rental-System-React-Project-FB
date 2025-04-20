const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Middleware to parse JSON
router.use(express.json());

//Model
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  usermail: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'vendor', 'customer'] },
}, { collection: 'SignUP_Details' }));

// Login route
router.post('/login', async (req, res) => {
  const { usermail, password, role } = req.body;

  if (!usermail || !password || !role) {
    return res.status(400).json({ error: 'Usermail, password, and role are required' });
  }

  try {
    const user = await User.findOne({ usermail, role });
    if (!user) {
      console.log('Invalid usermail or role');
      return res.status(400).json({ error: 'Invalid usermail or role' });
    }

    if (password !== user.password) {
      console.log('Invalid password');
      return res.status(400).json({ error: 'Invalid password' });
    }
    console.log('Login successful');
    res.status(200).json({ success: 'Login successful', user: { usermail: user.usermail, role: user.role } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
