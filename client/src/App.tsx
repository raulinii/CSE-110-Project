<<<<<<< HEAD
// src/App.tsx
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
>>>>>>> login-signup
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPageView from './views/MainPageView';
import StopwatchTimer from './component/StopwatchTimer';
import Layout from './Layout'; // Import the Layout component
import SleepVideoView from './views/SleepVideoView';
import StressVideoView from './views/StressVideoView';
import FocusVideoView from './views/FocusVideoView';

function App() {
<<<<<<< HEAD
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}> {/* Use Layout as a wrapper */}
            <Route path="/" element={<MainPageView />} />
            <Route path="/Clock" element={<StopwatchTimer />} />
            <Route path="/player/sleep" element={<SleepVideoView />} />
            <Route path="/player/stress" element={<StressVideoView />} />
            <Route path="/player/focus" element={<FocusVideoView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
=======
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
>>>>>>> login-signup
}

export default App;