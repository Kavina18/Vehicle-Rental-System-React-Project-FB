import React from 'react';
import { HashRouter , Route, Routes } from 'react-router-dom';
import {FrontPage} from "./FrontPage";
import { Login } from './Login';
import {Signup} from './SignUp';
import { Admin } from './Admin';
import { Vendor } from './Vendor';
import { User } from './User';
import { About } from './About';
import { Profile_Details } from './Profile_Details';
import { Successful } from './Successful';
import { Car_Details } from './Car_Details';
import { Approve_cars } from './Approve_cars';
import { Customer_Bookings } from './Customer_Bookings';
import { Vendor_Details } from './Vendor_Details'
//import './App.css';

function App() {
    return (
      <HashRouter>
        <Routes>
          <Route path='/' element={<FrontPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<About/>} />
          <Route path="/profile_details" element={<Profile_Details />} />
          <Route path="/successful" element={<Successful/>} />
          <Route path="/car_details" element={<Car_Details />} />
          <Route path="/approve_cars" element={<Approve_cars />} />
          <Route path="/customer_bookings" element={<Customer_Bookings />} />
          <Route path="/vendor_details" element={<Vendor_Details/>} />
        </Routes>
      </HashRouter>

    );
}

export default App;
