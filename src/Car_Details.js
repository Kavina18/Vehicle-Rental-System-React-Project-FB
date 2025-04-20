import React, { useState } from 'react';
import axios from 'axios';
import source from './Logo_Gocars.png';
import './Car_Details.css';
import { useNavigate, useLocation } from 'react-router-dom';

export function Car_Details() {
    const navigate = useNavigate();
    const location = useLocation();
    const { vendorId } = location.state || {}; // Retrieve vendorId from state

    const [formData, setFormData] = useState({
        car_model: "",
        car_number: "",
        car_colour: "",
        seat_availability: "",
        car_year: "",
        from_place: "",
        to_place: "",
        rate: "",
        car_image: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const carData = {
            ...formData,
            seat_availability: Number(formData.seat_availability),
            car_year: Number(formData.car_year),
            rate: Number(formData.rate),
            vendor_id: vendorId
        };

        try {
            const response = await axios.post("https://vehicle-rental-system-react-project-fb.onrender.com/api/car", carData); // Use POST method
            if (response.status === 200) { 
                alert("Car details saved successfully!");
                navigate('/vendor');
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
               
                alert(`${err.response.data.error}`);
            } else {
                console.error("Error saving car details:", err);
                alert("Something went wrong!");
            }
        }
    };

    return (
        <div className="car_details">
            <img src={source} alt='GoCars' id='logo'/>
            <h1 className="car_details_heading">Add Car Details</h1>
            <form className="car_details_form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="car_model">Car Model:</label>
                    <input name="car_model" type="text" className="car_details_input" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="car_number">Car Number:</label>
                    <input name="car_number" type="text" className="car_details_input" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="car_colour">Car Colour:</label>
                    <input name="car_colour" type="text" className="car_details_input" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="seat_availability">Seat Availability:</label>
                    <input name="seat_availability" type="number" className="car_details_input" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="car_year">Car Year:</label>
                    <input name="car_year" type="number" className="car_details_input" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="from_place">From Place:</label>
                    <input name="from_place" type="text" className="car_details_input" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="to_place">To Place:</label>
                    <input name="to_place" type="text" className="car_details_input" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="rate">Rent Amount:</label>
                    <input name="rate" type="number" className="car_details_input" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="car_image">Car Image (Link):</label>
                    <input name="car_image" type="url" className="car_details_input" required onChange={handleChange} placeholder="https://example.com/car-image.jpg" />
                </div>
                <button type="submit" className="car_details_button">Submit</button>
            </form>
        </div>
    );
}
