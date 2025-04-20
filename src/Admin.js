import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCar } from '@fortawesome/free-solid-svg-icons';
import source from './Logo_Gocars.png';
import { useNavigate } from "react-router-dom";

export function Admin() {
  const [vendorsCount, setVendorsCount] = useState(0);
  const [carsCount, setCarsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the number of vendors from the backend
    axios.get('https://vehicle-rental-system-react-project-fb.onrender.com/api/vendors-count')
      .then(response => setVendorsCount(response.data.count))
      .catch(error => console.error("Error fetching vendors count:", error));

    // Fetch the number of cars from the backend
    axios.get('https://vehicle-rental-system-react-project-fb.onrender.com/api/cars-count')
      .then(response => setCarsCount(response.data.count))
      .catch(error => console.error("Error fetching cars count:", error));
  }, []);

  function handleApproveClick() {
    navigate('/approve_cars');
  }

  function ClickCustomers() {
    navigate('/customer_bookings');
  }

  function ClickVendors() {
    navigate('/approve_cars');
  }

  return (
    <div className="Admin_page">
      <img src={source} alt='GoCars' id='logo' />
      <br />
      <h1 className="admin_heading">Admin Dashboard</h1>
      <div className='main_flex'>
        <div className="side_bar">
          <button className="menu_button" onClick={ClickCustomers}>
            <span><FontAwesomeIcon icon={faUsers} /></span>
            <span>Customers</span>
          </button>
          <button className="menu_button" onClick={ClickVendors}>
            <span><FontAwesomeIcon icon={faUsers} /></span>
            <span>Vendors</span>
          </button>
        </div>

        <div className="main_bar">
          <p className="text-lg">No of Vendors : {vendorsCount}</p>
          <p className="text-lg">No of Cars : {carsCount}</p>
          <button onClick={handleApproveClick} className="approve_cars_button" ><FontAwesomeIcon icon={faCar} />Approve Cars </button>
        </div>
      </div>
    </div>
  );
}
