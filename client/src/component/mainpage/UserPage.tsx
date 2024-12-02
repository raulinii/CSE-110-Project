// src/component/user/UserPage.tsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './UserPage.css';
import logo from '../mainpage/images/logo.png';

interface UserData {
  Username: string;
  Email: string;
  familiarity: string;
  time_choice_one: string;
  time_choice_two: string;
  time_choice_three: string;
}

const UserPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Initially true for dummy data

  useEffect(() => {
    const fetchDummyData = async () => {
      if (!isLoggedIn) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "dummy", "il4scSXsB0dS0mceoMal");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dummy data:", error);
        setLoading(false);
      }
    };

    fetchDummyData();
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  if (loading) {
    return (
      <div className="user-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn || !userData) {
    return (
      <div className="user-page">
        <div className="logo">
          <img src={logo} alt="MindfulU Logo" className="logo-image" />
          <span>Mindful U</span>
        </div>
        <div className="user-container">
          <div className="error">Please log in first to view your profile</div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="logo">
        <img src={logo} alt="MindfulU Logo" className="logo-image" />
        <span>Mindful U</span>
      </div>
      <div className="user-container">
        <h2>User Profile</h2>
        <div className="profile-section">
          <div className="form-group">
            <label>Username</label>
            <div className="info-display">{userData.Username}</div>
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <div className="info-display">{userData.Email}</div>
          </div>

          <div className="form-group">
            <label>Meditation Experience</label>
            <div className="info-display">{userData.familiarity}</div>
          </div>

          <div className="form-group">
            <label>Video Length Preferences</label>
            <div className="preferences-grid">
              <div className="preference-item">
                <span>First Choice:</span> {userData.time_choice_one}
              </div>
              <div className="preference-item">
                <span>Second Choice:</span> {userData.time_choice_two}
              </div>
              <div className="preference-item">
                <span>Third Choice:</span> {userData.time_choice_three}
              </div>
            </div>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserPage;


