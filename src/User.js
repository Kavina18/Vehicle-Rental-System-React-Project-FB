import React, { useState, useEffect } from "react";
import source from "./Logo_Gocars.png";
import { useNavigate } from "react-router-dom";
import "./User.css";
import { sampleData } from "./Data"; // Import sample data

export function User() {

  const [Rentcars, setRentCars] = useState([]);
  const navigate = useNavigate();
  
  function clickAbout(){
    navigate('/about');
  }

  function ClickRent(){
    navigate('/profile_details');
  }
  useEffect(() => {
    // Fetch data from backend API (replace with actual API endpoint)
    fetch("http://localhost:5000/rentcars")
      .then((response) => response.json())
      .then((data) => setRentCars(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Use sample data when fetch fails
        setRentCars(sampleData);
      });
  }, []);

  return (
    <div className="rent_cars_container">
        
      <div className="navbar">
        <nav>
        <img src={source} alt="GoCars" id="logo" />
          <button onClick={clickAbout} className="go_to_about_button">About</button>
          <input type="text" placeholder="🔍 search a car" className="search_bar" />
        </nav>
      </div>

      <div className="filter_container">
        <div>
          <label htmlFor="location">Location:</label>
          <input id="location" type="text" placeholder="Eg: Coimbatore" className="filter_input" />
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input id="destination" type="text" placeholder="Eg: Tirupur" className="filter_input" />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input id="date" type="text" placeholder="DD/MM/YYYY" className="filter_input" />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input id="time" type="text" placeholder="Timing" className="filter_input" />
        </div>
        <div>
          <label htmlFor="seats">Seats:</label>
          <input id="seats" type="text" placeholder="Seat Required" className="filter_input" />
        </div>
        <button className="filter_button">Filter</button>
      </div>

      <div className="cars_display">
        {Rentcars.map((car) => (
          <div key={car.name} className="car_card">
            <h2>{car.name}</h2>
            <img src={car.image} alt={car.name} className="car_image" />
            <p className="car_price">₹{car.price}/day</p>
            <button type="button" className="rent_button" onClick={ClickRent}>Rent now</button>
            <div className="car_info">
              <span>🚗 {car.seat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

