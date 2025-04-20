const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const Vendor = require('../models/Vendor'); // Import Vendor model
router.use(express.json());

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
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }, // Reference to Vendor
}, { collection: 'Car_Details' });

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

// POST route to add a new car
router.post('/Car', async (req, res) => {
  const {
    car_model,
    car_number,
    car_colour,
    seat_availability,
    car_year,
    from_place,
    to_place,
    rate,
    car_image,
    vendor_id
  } = req.body;

  try {
    if (!car_model || !car_number || !car_image || !vendor_id) {
      return res.status(400).json({ error: 'Car model, number, image, and vendor ID are required' });
    }

    // Check for duplicate car_number
    const existingCar = await Car.findOne({ car_number });
    if (existingCar) {
      return res.status(400).json({ error: 'Car number already exists', car_number });
    }

    const newCar = new Car({
      car_model,
      car_number,
      car_colour,
      seat_availability,
      car_year,
      from_place,
      to_place,
      rate,
      car_image,
      vendor_id
    });

    await newCar.save();
    res.status(200).json({ success: 'Car details saved', car: newCar });
  } catch (error) {
    if (error.code === 11000) { 
      return res.status(400).json({ error: 'Car number already exixts', details: error.message });
    }
    console.error('Error saving car details:', error);
    res.status(500).json({ error: 'Failed to save car details' });
  }
});

// GET route to fetch all car details(user page)
router.get('/car_details', async (req, res) => {
  try {
    const carDetails = await Car.find();
    res.status(200).json(carDetails);
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ error: 'Failed to fetch car details' });
  }
});

// GET route to fetch all car details with vendor information(approve cars)
router.get('/car_details_with_vendor', async (req, res) => {
  try {
    const carDetailsWithVendor = await Car.find().populate('vendor_id', 'mail_id first_name last_name phone_number city service_address');
    res.status(200).json(carDetailsWithVendor);
  } catch (error) {
    console.error('Error fetching car details with vendor information:', error);
    res.status(500).json({ error: 'Failed to fetch car details with vendor information' });
  }
});

// Route to get cars using vendor_id
router.get('/car_details/:vendorId', async (req, res) => {
  try {
    const { vendorId } = req.params;

    const cars = await Car.find({ vendor_id: vendorId });
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;