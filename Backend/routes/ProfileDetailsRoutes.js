const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Middleware to parse JSON
router.use(express.json());

// Define the Profile schema
const profileSchema = new mongoose.Schema({
  email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  from_place: { type: String, required: true },
  to_place: { type: String, required: true },
  date: { type: Date, required: true },
  timing: { type: String, required: true },
  car_model: { type: String, required: true },
  car_number: { type: String, required: true },
}, { collection: 'Profile_Details' });

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

// Route to handle profile creation or update
router.put('/profile', async (req, res) => {
  const { email, first_name, last_name, date_of_birth, phone_number, gender, from_place, to_place, date, timing, car_model, car_number } = req.body;
  const requiredFields = ['email', 'first_name', 'last_name', 'date_of_birth', 'phone_number', 'gender', 'from_place', 'to_place', 'date', 'timing', 'car_model', 'car_number'];
  const missingFields = requiredFields.filter(field => 
    req.body[field] === undefined || req.body[field] === null || req.body[field] === ''
  );

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  try {
    const newProfile = new Profile(req.body);
    await newProfile.save();

    res.status(200).json({ success: 'Profile added successfully', profile: newProfile });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET route to fetch all profile details
router.get('/customerDetails', async (req, res) => {
  try {
    const profileDetails = await Profile.find();
    res.status(200).json(profileDetails);
  } catch (error) {
    console.error('Error fetching profile details:', error);
    res.status(500).json({ error: 'Failed to fetch profile details' });
  }
});

module.exports = router;