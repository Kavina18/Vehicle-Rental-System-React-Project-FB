
import React from "react";
import { useNavigate } from "react-router-dom";
import source from "./Logo_Gocars.png";
import "./Car_Details.css";

export function Car_Details() {
    const navigate = useNavigate();

    function clickSubmit(event) {
        event.preventDefault(); 
        navigate("/vendor");
    }

    return (
        <div className="car_details">
            <img src={source} alt="GoCars" id="logo" />
            <h1 className="car_details_heading">Car Details</h1>
            <form className="car_details_form" onSubmit={clickSubmit}>
                <div>
                    <label htmlFor="car_model">Car Model:</label>
                    <input id="car_model" type="text" className="car_details_input" required />
                </div>
                <div>
                    <label htmlFor="car_number">Car Number:</label>
                    <input id="car_number" type="text" className="car_details_input" required />
                </div>
                <div>
                    <label htmlFor="car_colour">Car Colour:</label>
                    <input id="car_colour" type="text" className="car_details_input" required />
                </div>
                <div>
                    <label htmlFor="seat_availability">Seat Availability:</label>
                    <input id="seat_availability" type="text" className="car_details_input" required />
                </div>
                <div>
                    <label htmlFor="car_year">Car Year:</label>
                    <input id="car_year" type="text" className="car_details_input" required />
                </div>
                <div>
                    <label htmlFor="from_place">From Place:</label>
                    <input id="from_place" type="text" className="car_details_input" required />
                </div>
                <div>
                    <label htmlFor="to_place">To Place:</label>
                    <input id="to_place" type="text" className="car_details_input" required />
                </div>
                <div>
                    <label htmlFor="car_image">Car Image:</label>
                    <input id="car_image" type="file" className="car_details_input" required />
                </div>
                <div>
                    <label htmlFor="rent_amount">Rent Amount:</label>
                    <input id="rent_amount" type="number" className="car_details_input" required />
                </div>
                <button type="submit" className="car_details_button">Submit</button>
            </form>
        </div>
    );
}
