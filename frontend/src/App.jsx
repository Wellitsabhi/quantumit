import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <>
       <Router>
      <Routes>
        <Route path="/register" element={<Register />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Login />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App
