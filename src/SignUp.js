import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate, Link } from 'react-router-dom';
import source from './Logo_Gocars.png';
import axios from 'axios';

export function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");

    function handleSubmit(event) {
        event.preventDefault();
        axios.put('https://vehicle-rental-system-react-project-fb.onrender.com/api/users/signup', { username, password, role })
            .then(response => {
                console.log(response.data.message);
                navigate('/login');
            })
            .catch(error => {
                if (error.response?.data?.error === 'Username already exists') {
                    alert('Username already exists. Please choose a different username.');
                } else {
                    console.error('Error during signup:', error.response?.data || error.message);
                    alert('Signup failed. Please try again.');
                }
            });
    };

    return (
        <div className="sign_up">
            <img src={source} alt="GoCars" id="logo" />
            <form className='sign_up_form' onSubmit={handleSubmit}>
                <h2 className='sign_up_heading'>Sign Up</h2>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" required value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <label id="lpassword" htmlFor="password">Password:</label>
                    <input id="password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
                        <option value="customer">Customer</option>
                        <option value="vendor">Vendor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className='sign_up_button'>SignUp</button>
                <p className='already_sign_in'>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};
