const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  mail_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  country: { type: String, required: true },
  city: { type: String, required: true },
  service_address: { type: String, required: true },
}, { collection: 'Vendor_Details' });

module.exports = mongoose.model('Vendor', vendorSchema);
