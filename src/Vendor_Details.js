import React, { useState } from "react";
import "./Profile_Details.css";
import source from "./Logo_Gocars.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export function Vendor_Details() {
  const navigate = useNavigate();
  const location = useLocation();

  const usermail = location.state?.usermail;

  const [formData, setFormData] = useState({
    mail_id: usermail || "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone_number: "",
    gender: "",
    country: "",
    city: "",
    service_address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("https://vehicle-rental-system-react-project-fb.onrender.com/api/vendor", formData);

      if (response.status === 200) {
        alert(response.data.success);
        const vendorId = response.data.vendor_id;
        navigate("/car_details", { state: { vendorId } });
      } else {
        alert("Failed to save vendor details.");
      }
    } catch (error) {
      console.error("Error while sending data:", error.response || error.message);
      if (error.response) {
        alert(`${error.response.data.error || "Unknown error occurred"}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="profile_details">
      <img src={source} alt="GoCars Logo" id="logo" />
      <h2 className="heading">Vendor Details</h2>
      <form id="person_Details_form" onSubmit={handleSubmit}>
        <div>
          <label>Email Address</label>
          <input type="email" name="mail_id" placeholder="example@gmail.com" className="input_profile" value={formData.mail_id} readOnly required />
        </div>
        <div>
          <label>First Name</label>
          <input type="text" name="first_name" className="input_profile" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="last_name" className="input_profile" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" name="date_of_birth" className="input_profile" value={formData.date_of_birth} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" name="phone_number" className="input_profile" value={formData.phone_number} onChange={handleChange} required />
        </div>
        <div className="col-span-2">
          <label>Gender</label>
          <select name="gender" className="input_profile" value={formData.gender} onChange={handleChange} required >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Country</label>
          <input type="text" name="country" className="input_profile" value={formData.country} onChange={handleChange} required />
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" className="input_profile" value={formData.city} onChange={handleChange} required />
        </div>
        <div>
          <label>Service Address</label>
          <input type="text" name="service_address" className="input_profile" value={formData.service_address} onChange={handleChange} required />
        </div>
        <br />
        <button type="submit" className="next">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
    </div>
  );
}
