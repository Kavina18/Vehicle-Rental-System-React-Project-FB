import './Approve_cars.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import source from "./Logo_Gocars.png";
import { sampleCars } from "./sampleData";
import { useNavigate } from "react-router-dom";

export function Approve_cars() {
  const [cars, setCars] = useState([]);

  const navigate = useNavigate();

    function clickBack(){
        navigate('/admin');
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
    <div className="approve_cars_container">
      <img src={source} alt="GoCars" id="logo" />
      <button  className='back_icon' onClick={clickBack}><FontAwesomeIcon icon={faCircleArrowLeft} className='back_icon' /></button>
      <h1 className="heading_approve_cars">Approve Cars</h1>

      <div className="table_container">
        <table className="approve_cars_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Car</th>
              <th>Seat</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="table_row">
                <td>{car.name}</td>
                <td>{car.contact}</td>
                <td>{car.car}</td>
                <td>{car.seat}</td>
                <td>
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



