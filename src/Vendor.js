import './Vendor.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons"; // Ensure faCar is imported correctly
import source from "./Logo_Gocars.png";
import { sampleCars } from "./sampleData";
import { useNavigate } from "react-router-dom";

export function Vendor() {
  const [cars, setCars] = useState([]);

  const navigate = useNavigate();

  function Addcars() {
    navigate('/vendor_Details');
  }

  useEffect(() => {
    // Fetch data from backend API (replace with actual API endpoint)
    fetch("http://localhost:5000/cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Use sample data in case of error
        setCars(sampleCars);
      });
  }, []);

  return (
    <div className="mycars_container">
      <img src={source} alt="GoCars" id="logo" />
      <button className='car_icon' onClick={Addcars}>
        <FontAwesomeIcon icon={faCar} /> Add Cars
      </button>
      <h1 className="mycars_heading">My Cars</h1>
      <div className="mycarstable_container">
        <table className="mycars_table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Seat</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((cars) => (
              <tr key={cars.id} className="mycar_table_row">
                <td>{cars.car}</td>
                <td>{cars.model}</td>
                <td>{cars.year}</td>
                <td>{cars.seat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    </div>
  );
}



