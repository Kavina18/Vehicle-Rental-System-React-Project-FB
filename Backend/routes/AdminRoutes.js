const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the Vendor schema
const vendorSchema = new mongoose.Schema({
  mail_id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  country: { type: String, required: true },
  city: { type: String, required: true },
  service_address: { type: String, required: true },
}, { collection: 'Vendor_Details' });

const Vendor = mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);

// Define the Car schema
const carSchema = new mongoose.Schema({
  car_model: { type: String, required: true },
  car_number: { type: String, required: true, unique: true },
  car_colour: { type: String, required: true },
  seat_availability: { type: Number, required: true, min: 1 },
  car_year: { type: Number, required: true },
  from_place: { type: String, required: true },
  to_place: { type: String, required: true },
  rate: { type: Number, required: true },
  car_image: { type: String, required: true },
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
}, { collection: 'Car_Details' });

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

// GET route to fetch the number of vendors
router.get('/vendors-count', async (req, res) => {
  try {
    const count = await Vendor.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching vendors count:', error);
    res.status(500).json({ error: 'Failed to fetch vendors count' });
  }
});

// GET route to fetch the number of cars
router.get('/cars-count', async (req, res) => {
  try {
    const count = await Car.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching cars count:', error);
    res.status(500).json({ error: 'Failed to fetch cars count' });
  }
});

module.exports = router;
