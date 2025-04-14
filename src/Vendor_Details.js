import React from "react";
import "./Profile_Details.css"; 
import source from "./Logo_Gocars.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
export function Vendor_Details(){

    const navigate = useNavigate();

    function nextPage(event){
        event.preventDefault();
        navigate('/car_details');
    }

    return(
        <div className="profile_details" >
            <img src={source} alt="GoCars Logo" id="logo" /> 
            <h2 className="heading">Vendor Details</h2>
            <form id="person_Details_form" onSubmit={nextPage} >
                <div>
                    <label>Email Address</label>
                    <input type="email" placeholder="example@gmail.com" className="input_profile" required />
                </div>
                <div>
                    <label>First Name</label>
                    <input type="text" className="input_profile" required />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" className="input_profile" required />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" className="input_profile" required/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="text" className="input_profile" required/>
                </div>
                <div className="col-span-2">
                    <label>Gender</label>
                    <select className="input_profile">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Country</label>
                    <input type="text" className="input_profile" required />
                </div>
                <div>
                    <label>City</label>
                    <input type="text" className="input_profile" required />
                </div>
                <div>
                    <label>Service Address</label>
                    <input type="text" className="input_profile" required />
                </div><br></br>
                <button type="submit" className="next"><FontAwesomeIcon icon={faArrowRight} /></button>
            </form>
        </div>
    );
}