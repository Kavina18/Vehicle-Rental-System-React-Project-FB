import './Customer_Bookings.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import source from "./Logo_Gocars.png";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export function Customer_Bookings() {

  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  function clickBack() {
    navigate('/admin');
  }

  function formatTime(timing) {
    const [hour, minute] = timing.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    axios.get("https://vehicle-rental-system-react-project-fb.onrender.com/api/customerDetails")
      .then((response) => {
        console.log("Fetched data:", response.data);
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        alert("Failed to fetch data. Please check the backend server.");
      });
  }, []);

  return (
    <div className="customer_bookings_container">
      <img src={source} alt="GoCars" id="logo" />
      <button className='back_icon' onClick={clickBack}><FontAwesomeIcon icon={faCircleArrowLeft} className='back_icon' /></button>
      <h1 className="heading_customer_bookings">Customer Bookings</h1>

      <div className="table_container">
        <table className="customer_bookings_table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Contact Number</th>
              <th>Car Name</th>
              <th>Car Number</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Booking Date</th>
              <th>Booking Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="table_row">
                <td>{booking.first_name}</td>
                <td>{booking.phone_number}</td>
                <td>{booking.car_model}</td>
                <td>{booking.car_number}</td>
                <td>{booking.from_place}</td>
                <td>{booking.to_place}</td>
                <td>{formatDate(booking.date)}</td> {/* Format date */}
                <td>{formatTime(booking.timing)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
