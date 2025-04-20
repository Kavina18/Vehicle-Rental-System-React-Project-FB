import React from "react";
import "./Successful.css";
import source from './Logo_Gocars.png';
import { useNavigate } from "react-router-dom";

export function Successful(){

    const navigate = useNavigate(); 

    function clickUser(){
        navigate('/user');
    }
    
    return(
    <div className="Successful">
        <img src={source} alt="GoCars Logo" id="logo" />
        <div className="message">
            <h1>SUCCESSFULLY BOOKED...</h1>
        </div>
        <div className="front_page_button">
            <button className="continue" onClick={clickUser}>Continue</button>
        </div>
    </div>
    );
}