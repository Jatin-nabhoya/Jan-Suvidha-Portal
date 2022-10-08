// import './App.css';
import React from "react";
import { Routes, Route } from 'react-router-dom';

import Login from './Auth/Login';
import Register from './Auth/Register';
import ContactUs from './Auth/ContactUs';
import Home from './Home';
import Header from './home/Header';
import VerifyOtp from './Auth/VerifyOtp';
import AdminHome from './SemiAdminPannel/AdminHome';
import Schemedetail from './SemiAdminPannel/AddNewScheme/SchemeDetails';
import Userinputform from './SemiAdminPannel/AddNewScheme/UserInputForm';
import Userdocumentform from './SemiAdminPannel/AddNewScheme/UserDocumentForm';
import UserHome from "./UserPanel/UserHome";
import SchemeApplication from "./UserPanel/SchemeApplication";


import Userdashboard from './UserPannel/UserDashboard';
import AvailableScheme from './UserPannel/AvailableScheme';
import AppliedScheme from './UserPannel/AppliedScheme';



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
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/schemeapp" element={<SchemeApplication />} />


        //Semi admin
        <Route path='/adminHome' element={<AdminHome />} />
        <Route path='/schemedetails' element={<Schemedetail />} />
        <Route path='/userinputform' element={<Userinputform />} />
        <Route path='/userdocumentform' element={<Userdocumentform />} />

        //user Pannel
        <Route path='/userdashboard' element={<Userdashboard />} />
        <Route path='/availablescheme' element={<AvailableScheme />} />
        <Route path='/appliedscheme' element={<AppliedScheme />} />

      </Routes>
    </>
  );
}

export default App;
