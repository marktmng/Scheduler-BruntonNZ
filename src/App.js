import React, { useState, useEffect } from 'react';
import { Menu, Modal, DatePicker } from "antd";
import Scheduler from './Scheduler';
import EventForm from './EventForm';
import AuUsers from './auUsers'; // Import the AuUsers component
import './App.css';
import './Style.css';
import './navbar.css';
import { fetchData } from './Api';
import moment from 'moment';
import TopNavbar from './TopNavbar';
import Login from './Login'; // Import the Login component
import { Router } from './router';
import { BrowserRouter } from 'react-router-dom';

// import Profile from './Profile'; // Import the Profile component
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Employee from './employee';


function App() { //{ fetchSchUser }
 

 
 

  return <BrowserRouter>
    <Router /> 
    </BrowserRouter>
}

export default App;
