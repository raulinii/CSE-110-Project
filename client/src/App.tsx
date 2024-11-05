import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />      {/* Default route for login */}
                    <Route path="/signup" element={<Signup />} /> {/* Route for signup */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
