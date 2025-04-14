import './Customer_Bookings.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import source from "./Logo_Gocars.png";
import { sampleBookings } from "./sampleData";
import { useNavigate } from "react-router-dom";

export function Customer_Bookings() {

 
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  function clickBack() {
    navigate('/admin');
  }

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Use sample data in case of error
        setBookings(sampleBookings);
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
              <th>Car</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="table_row">
                <td>{booking.customerName}</td>
                <td>{booking.contact}</td>
                <td>{booking.car}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{booking.bookingDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
