import React, { useState } from "react";
import "./Profile_Details.css"; 
import source from "./Logo_Gocars.png";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

export function Profile_Details() {
    const navigate = useNavigate();
    const location = useLocation();
    const { car } = location.state || {};


    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        dob: "",
        phoneNumber: "",
        gender: "",
        fromPlace: "",
        toPlace: "",
        date: "",
        timing: "",
        car_name: car?.car_model || "",
        car_number: car?.car_number || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedData = {
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            date_of_birth: formData.dob,
            phone_number: Number(formData.phoneNumber), 
            gender: formData.gender,
            from_place: formData.fromPlace,
            to_place: formData.toPlace,
            date: formData.date,
            timing: formData.timing,
            car_model: formData.car_name, 
            car_number: formData.car_number,
        };

        axios.put('https://vehicle-rental-system-react-project-fb.onrender.com/api/profile', formattedData)
            .then(response => {
                console.log(response.data.success);
                alert('Booking successful!');
                navigate('/successful');
            })
            .catch(error => {
                console.error('Error submitting profile:', error.response?.data || error.message);
                alert('Booking failed. Please try again.');
            });
    };

    return (
        <div className="profile_details">
            <img src={source} alt="GoCars Logo" id="logo" /> 
            <h2 className="heading">Profile Details</h2>
            <form id="person_Details_form" onSubmit={handleSubmit}>
                <div>
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input_profile" placeholder="example@gmail.com" />
                </div>
                <div>
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input_profile" />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input_profile" />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input_profile" />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="input_profile" />
                </div>
                <div className="col-span-2">
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="input_profile">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>From Place</label>
                    <input type="text" name="fromPlace" value={formData.fromPlace} onChange={handleChange} className="input_profile" />
                </div>
                <div>
                    <label>To Place</label>
                    <input type="text" name="toPlace" value={formData.toPlace} onChange={handleChange} className="input_profile" />
                </div>
                <div>
                    <label>Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="input_profile" />
                </div>
                <div>
                    <label>Timing</label>
                    <input type="time" name="timing" value={formData.timing} onChange={handleChange} className="input_profile" />
                </div>
                <button className="book_now" type="submit">Book Now</button>
            </form>
        </div>
    );
}
