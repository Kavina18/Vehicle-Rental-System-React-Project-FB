import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import source from './Logo_Gocars.png';
import "./Login.css";

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        return username !== '' && password !== '';
    };

    async function handleSubmit(event, role) {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('https://vehicle-rental-system-react-project-fb.onrender.com/api/login', { username, password, role });

                if (response.status === 200) {
                    alert(response.data.success);
                    if (role === 'admin') {
                        navigate("/admin");
                    } else if (role === 'vendor') {
                        navigate('/vendor');
                    } else if (role === 'customer') {
                        navigate('/user');
                    }
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.error);
                } else {
                    console.error('Error during login:', error);
                    alert('An error occurred. Please try again.');
                }
            }
        } else {
            alert('Please fill in both fields.');
        }
    }

    return (
        <div className='login'>
            <img src={source} alt='GoCars' id='logo' />
            <form className='login_form'>
                <h2 id="heading">Login to your Account</h2>
                <div className='container'>
                    <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="login_button" onClick={(event) => handleSubmit(event, 'admin')}>Admin</button>
                    <button type="submit" className="login_button" onClick={(event) => handleSubmit(event, 'vendor')}>Vendor</button>
                    <button type="submit" className="login_button" onClick={(event) => handleSubmit(event, 'customer')}>Customer</button>
                </div>
            </form>
        </div>
    );
}
