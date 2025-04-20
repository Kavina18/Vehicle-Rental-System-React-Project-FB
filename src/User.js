import React, { useState, useEffect } from "react";
import source from "./Logo_Gocars.png";
import { useNavigate } from "react-router-dom";
import "./User.css";
import axios from "axios";

export function User() {
  const [allCars, setAllCars] = useState([]);
  const [Rentcars, setRentCars] = useState([]);
  const [searchCar,setSearchCar] = useState("");
  const [filters, setFilters] = useState({
    location: '',
    destination: '',
    seats: '',
    rate: ''
  });

  const navigate = useNavigate();

  function clickAbout() {
    navigate('/about');
  }

  function ClickRent(car) {
    navigate('/profile_details', { state: { car } });
  }

  function handleFilterChange(e) {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [id]: value }));
  }

  // Fetch cars once
  useEffect(() => {
    axios.get("https://vehicle-rental-system-react-project-fb.onrender.com/api/car_details")
      .then((response) => {
        setAllCars(response.data);
        setRentCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });
  }, []);

  useEffect(() => {
    let filteredCars = [...allCars];

    if (filters.location.trim()) {
      filteredCars = filteredCars.filter(car =>
        car.from_place.toLowerCase().includes(filters.location.toLowerCase().trim())
      );
    }

    if (filters.destination.trim()) {
      filteredCars = filteredCars.filter(car =>
        car.to_place.toLowerCase().includes(filters.destination.toLowerCase().trim())
      );
    }

    if (filters.seats && !isNaN(filters.seats)) {
      filteredCars = filteredCars.filter(car =>
        car.seat_availability === parseInt(filters.seats)
      );
    }

    if (filters.rate && !isNaN(filters.rate)) {
      filteredCars = filteredCars.filter(car =>
        car.rate <= parseInt(filters.rate)
      );
    }

    if (searchCar.trim()) {
      filteredCars = filteredCars.filter(car =>
        car.car_model.toLowerCase().includes(searchCar.toLowerCase().trim())
      );
    }

    setRentCars(filteredCars);
  }, [filters, searchCar, allCars]);

  return (
    <div className="rent_cars_container">
      <div className="navbar">
        <nav>
          <img src={source} alt="GoCars" id="logo" />
          <button onClick={clickAbout} className="go_to_about_button">About</button>
          <input type="text" placeholder="🔍 search a car" className="search_bar" value={searchCar} onChange={(e) => setSearchCar(e.target.value)}/>
        </nav>
      </div>

      <div className="filter_container">
        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            placeholder="Eg: Coimbatore"
            className="filter_input"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input
            id="destination"
            type="text"
            placeholder="Eg: Tirupur"
            className="filter_input"
            value={filters.destination}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="seats">Seats:</label>
          <input
            id="seats"
            type="number"
            placeholder="Seat Required"
            className="filter_input"
            value={filters.seats}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="rate">Rate:</label>
          <input
            id="rate"
            type="number"
            placeholder="Max Rate (₹)"
            className="filter_input"
            value={filters.rate}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="cars_display">
        {Rentcars.length === 0 ? (
          <p className="no_results">No cars match your filter.</p>
        ) : (
          Rentcars.map((car) => (
            <div key={car._id || car.car_model} className="car_card">
              <h2>{car.car_model}</h2>
              <img src={car.car_image} alt={car.car_model} className="car_image"/>
              <p className="car_price">₹{car.rate}/day</p>
              <button type="button" className="rent_button" onClick={() => ClickRent(car)}>
                Book now
              </button>
              <div className="car_info">
                <span>🚗 {car.seat_availability} Seats</span>
              </div>
              <div>From : {car.from_place}</div>
              <div>To : {car.to_place}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
