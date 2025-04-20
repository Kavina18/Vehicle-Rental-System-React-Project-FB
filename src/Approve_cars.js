import './Approve_cars.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import source from "./Logo_Gocars.png";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Approve_cars() {
  const [vendorCars, setVendorCars] = useState([]);

  const navigate = useNavigate();

  function clickBack() {
    navigate('/admin');
  }

  useEffect(() => {
    axios.get("https://vehicle-rental-system-react-project-fb.onrender.com/api/car_details_with_vendor")
      .then((response) => {
        console.log("Fetched vendor and car details:", response.data);
        setVendorCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor and car details:", error.message);
        alert("Failed to fetch vendor and car details. Please check the backend server.");
      });
  }, []);

  return (
    <div className="approve_cars_container">
      <img src={source} alt="GoCars" id="logo" />
      <button className='back_icon' onClick={clickBack}><FontAwesomeIcon icon={faCircleArrowLeft} className='back_icon' /></button>
      <h1 className="heading_approve_cars">Approve Cars</h1>

      <div className="table_container">
        <table className="approve_cars_table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Contact</th>
              <th>Car Model</th>
              <th>Car Number</th>
              <th>Seats</th>
              <th>Rate</th>
              <th>From</th>
              <th>To</th>
              <th className="approve">Approval</th>
            </tr>
          </thead>
          <tbody>
            {vendorCars.map((item) => (
              <tr key={item._id} className="table_row">
                <td>{item.vendor_id?.first_name} {item.vendor_id?.last_name}</td>
                <td>{item.vendor_id?.phone_number}</td>
                <td>{item.car_model}</td>
                <td>{item.car_number}</td>
                <td>{item.seat_availability}</td>
                <td>{item.rate}</td>
                <td>{item.from_place}</td>
                <td>{item.to_place}</td>
                <td className="approve">
                  <button className="approve_button">Approve</button>
                  <button className="reject_button">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



