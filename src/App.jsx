import React from "react";
import {Route, Routes, BrowserRouter as Router}  from 'react-router-dom'

import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login"
import SignUp from "./pages/Signup"
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import PointsDashboard from "./pages/PointsDashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Landing from "./pages/Landing1";
import Header from "./components/Header";
import OTPVerificationPage from "./pages/OtpVerificationPage";
import BillScan from "./pages/BillScan";
import RewardsAndPropertyListings from "./pages/RewardsAndPropertyListings";
import BuilderDashboard from "./pages/BuilderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TransactionBrokerage from "./pages/TransactionBrokerage1";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const App = ()=> {

  return (
    <React.Fragment>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/otp-verification" element={<OTPVerificationPage/>}/>
        <Route path="/reset-password" element={<ForgetPassword/>}/>
        <Route path="/bill-scan" element={<BillScan/>}/>
        <Route path="/points-dashboard" element={<PointsDashboard/>}/>
        <Route path="/rewards-dashboard" element={<RewardsAndPropertyListings/>}/>
        <Route path="/builder-dashboard" element={<BuilderDashboard/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/transaction-brokerage" element={<TransactionBrokerage/>}/>
       
        <Route path="/profile" element={<ProfilePage/>}/>
       
      </Routes>
    </Router>
    <Footer/>
    <ToastContainer />
    </React.Fragment>
  );
}

export default App;

