const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vendor = require('../models/Vendor');
router.use(express.json());

// PUT route to add or update vendor details
router.put('/vendor', async (req, res) => {
  
  try {
    const {
      mail_id,
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      gender,
      country,
      city,
      service_address
    } = req.body;

    if (!mail_id || !first_name || !last_name || !date_of_birth || !phone_number || !gender || !country || !city || !service_address) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingVendor = await Vendor.findOne({ mail_id });
    if (existingVendor) {
      // Check for mismatched fields
      const updates = {};
      if (existingVendor.first_name !== first_name) updates.first_name = first_name;
      if (existingVendor.last_name !== last_name) updates.last_name = last_name;
      if (existingVendor.date_of_birth.toISOString() !== new Date(date_of_birth).toISOString()) updates.date_of_birth = date_of_birth;
      if (existingVendor.phone_number !== phone_number) updates.phone_number = phone_number;
      if (existingVendor.gender !== gender) updates.gender = gender;
      if (existingVendor.country !== country) updates.country = country;
      if (existingVendor.city !== city) updates.city = city;
      if (existingVendor.service_address !== service_address) updates.service_address = service_address;

      if (Object.keys(updates).length > 0) {
        await Vendor.updateOne({ mail_id }, { $set: updates });
        return res.status(200).json({ success: 'Vendor details updated', vendor_id: existingVendor._id });
      }

      return res.status(200).json({ success: 'Vendor already exists with matching details', vendor_id: existingVendor._id });
    }

    // Create a new vendor if no existing vendor is found
    const newVendor = new Vendor({
      mail_id,
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      gender,
      country,
      city,
      service_address
    });

    await newVendor.save();
    res.status(200).json({ success: 'Vendor details saved', vendor_id: newVendor._id });
  } catch (error) {
    console.error('Error saving vendor details:', error);
    res.status(500).json({ error: 'Failed to save vendor details' });
  }
});


// Route to get vendor_id using usermail
router.get('/get_vendor_id', async (req, res) => {
  try {
    const usermail = req.headers['x-usermail'];
    if (!usermail) {
      return res.status(400).json({ error: 'Usermail is required' });
    }

    const vendor = await Vendor.findOne({ mail_id: usermail });
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json({ vendor_id: vendor._id });
  } catch (error) {
    console.error('Error fetching vendor ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;