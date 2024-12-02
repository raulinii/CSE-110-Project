import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login'; // Import Login component
import MainPageView from './views/MainPageView';
import StopwatchTimer from './component/timerclock/StopwatchTimer';
import Layout from './Layout';
import UserPage from './component/mainpage/UserPage'; // Add this import
import SleepVideoView from './views/SleepVideoView';
import StressVideoView from './views/StressVideoView';
import FocusVideoView from './views/FocusVideoView';
import ForgotPassword from './components/forgotPass/forgotPass'; // Import ForgotPassword component
import Signup from './components/Signup/Signup'; // Import your Signup component


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<Login />} /> {/* Start at Login page */}
          
          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} /> {/* Add route for Signup page */}
          
          {/* Forgot Password Route */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password page */}

          {/* Protected Routes (Main App) */}
          <Route element={<Layout />}>
            <Route path="/main" element={<MainPageView />} />
            <Route path="/Clock" element={<StopwatchTimer />} />
            <Route path="/User" element={<UserPage />} /> {/* Add this route */}
            <Route path="/player/sleep" element={<SleepVideoView />} />
            <Route path="/player/stress" element={<StressVideoView />} />
            <Route path="/player/focus" element={<FocusVideoView />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;