import './Vendor.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import source from "./Logo_Gocars.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export function Vendor() {
  const [cars, setCars] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const usermail = location.state?.usermail;

  useEffect(() => {
    if (usermail) {
      sessionStorage.setItem('usermail', usermail);
    }
  }, [usermail]);

  const storedUsermail = sessionStorage.getItem('usermail');

  function Addcars() {
    sessionStorage.setItem('refresh', 'true');
    navigate('/vendor_details', { state: { usermail: storedUsermail } });
  }

  useEffect(() => {
    const shouldRefresh = sessionStorage.getItem('refresh') === 'true';

    if (storedUsermail) {
      // Fetch vendor_id using usermail
      axios.get('https://vehicle-rental-system-react-project-fb.onrender.com/api/get_vendor_id', {
        headers: {
          'x-usermail': storedUsermail
        }
      })
        .then((response) => {
          const vendorId = response.data.vendor_id;

          // Fetch cars using vendor_id
          return axios.get(`https://vehicle-rental-system-react-project-fb.onrender.com/api/car_details/${vendorId}`);
        })
        .then((response) => {
          setCars(response.data); 
          if (shouldRefresh) {
            sessionStorage.removeItem('refresh');
          }
        })
        .catch((error) => {
          console.error("Error fetching vendor cars:", error);
        });
        
    }
  }, [refresh]);

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
              <th>car Image</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Seat</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car._id} className="mycar_table_row">
                  <td><img src={car.car_image} alt={car.car_model} height={100} width={150}></img></td>
                  <td>{car.car_model}</td>
                  <td>{car.car_number}</td>
                  <td>{car.car_year}</td>
                  <td>{car.seat_availability}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No cars added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div> 
    </div>
  );
}



