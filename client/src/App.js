import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import AdminHome from './pages/AdminHome.js';
import UserHome from './pages/UserHome.js';


function App() {
  return (
    <div>
       <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminHome/>}/>
            <Route path="/user" element={<UserHome/>}/>
          </Routes>
        </Router>
    </div>
  )
}

export default App
