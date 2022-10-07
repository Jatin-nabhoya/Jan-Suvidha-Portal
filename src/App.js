import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Login from './Auth/Login';
import Register from './Auth/Register';
import ContactUs from './Auth/ContactUs';
import Home from './Home';
import Header from './home/Header';
import AdminHome from './SemiAdminPannel/AdminHome';
import Schemedetail from './SemiAdminPannel/AddNewScheme/SchemeDetails';
import Userinputform from './SemiAdminPannel/AddNewScheme/UserInputForm';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about-us' element={<Register />} />
        <Route path='/our-service' element={<Register />} />

        //Semi admin
        <Route path='/AdminHome' element={<AdminHome />} />
        <Route path='/schemedetails' element={<Schemedetail />} />
        <Route path='/userinputform' element={<Userinputform />} />
      </Routes>
    </>
  );
}

export default App;
