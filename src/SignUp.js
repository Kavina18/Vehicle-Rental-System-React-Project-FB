import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate, Link } from 'react-router-dom';
import source from './Logo_Gocars.png';
import axios from 'axios';

export function Signup() {
    const navigate = useNavigate();
    const [usermail, setUsermail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");

    function handleSubmit(event) {
        event.preventDefault();
        axios.put('https://vehicle-rental-system-react-project-fb.onrender.com/api/users/signup', { usermail, password, role })
            .then(response => {
                console.log(response.data.message);
                navigate('/login');
            })
            .catch(error => {
                alert('User already exists with same mail id. Please choose a different usermail.');    
            });
    };

    return (
        <div className="sign_up">
            <img src={source} alt="GoCars" id="logo" />
            <form className='sign_up_form' onSubmit={handleSubmit}>
                <h2 className='sign_up_heading'>Sign Up</h2>
                <div>
                    <label htmlFor="usermail">Usermail:</label>
                    <input id="usermail" type='email' required value={usermail} onChange={(event) => setUsermail(event.target.value)} />
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