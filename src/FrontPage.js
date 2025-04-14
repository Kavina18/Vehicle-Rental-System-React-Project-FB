import React from 'react';
import './FrontPage.css';
import { useNavigate } from 'react-router-dom';

export function FrontPage() {
  const navigate = useNavigate();
    const continueClick = () => {
      navigate('/signup');
    };

    return (
        <div className="front_page">
            <header className="front_page_header">
                <h1>Welcome to Go Cars</h1>
            </header>
            <div className="front_page_button">
                <button className="continue" onClick={continueClick}>continue...</button>
            </div>
        </div>
    );
}

export default FrontPage;
