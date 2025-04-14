import './About.css';
import React from 'react';
import source from './Logo_Gocars.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export function About(){
    
    const navigate = useNavigate();

    function clickBack(){
        navigate('/user');
    }
    
    return (
        <div className="about">
            <img src = {source} alt='GoCars' id='logo'/>
            <button  className='back_icon' onClick={clickBack}><FontAwesomeIcon icon={faCircleArrowLeft} className='back_icon' /></button>
        <h4>About:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, risus a fermentum eleifend, erat odio rhoncus neque, id tristique nunc orci a libero. Vestibulum bibendum lacus eget dolor elementum, ac tempor sem sodales. Fusce facilisis, augue eget tincidunt gravida, sapien mauris tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, risus a fermentum eleifend, erat odio rhoncus neque, id tristique nunc orci a libero. </p>
        <h4>Contact:</h4>
        <p>Contact : 
        Business Name: GoCar Services<br/> Email: info@gocars.com <br/>Phone: +1 800-555-1234 <br/>Address: 7890 Sunset Avenue, Los Angeles,   CA, 90028, USA<br/> Website: www.gorentalscars.com<br/>Customer Support: support@gocars.com</p>
        </div>
    );
}