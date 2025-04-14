const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://717822l224:Kavina@vehiclerentalcluster.uifi9.mongodb.net/vehicle_rental_system?retryWrites=true&w=majority")
  .then(() => console.log('Connected to MongoDB Atlas - Database: vehicle_rental_system'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Import user signup and login routes
const userSignUp = require('./routes/SignUpRoutes.js');
const userLogin = require('./routes/LoginRoutes.js');

// Use user signup and login routes
app.use('/api/users', userSignUp);
app.use('/api', userLogin);

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});