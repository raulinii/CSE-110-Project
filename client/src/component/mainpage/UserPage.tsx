import React, { useState, useEffect } from 'react';
import './UserPage.css';
import logo from '../mainpage/images/logo.png';
import {getUserInfo} from "../../services/firebaseServices"
import {User} from "../../types/User"


const UserPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const Data = await getUserInfo(); 
        setUserData(Data);
      } catch (err) {
        setError("Failed to fetch meditations. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

if (loading) return(
<div>
  <h1>User Profile</h1>
  <p>Loading...</p>
</div>
);
if (error) return (
<div>
  <h1>User Profile</h1>
  <p>{error}</p>
</div>);


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
            <div className="info-display">{userData?.Username}</div>
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <div className="info-display">{userData?.Email}</div>
          </div>

          <div className="form-group">
            <label>Meditation Experience</label>
            <div className="info-display">{userData?.familiarity}</div>
          </div>

          <div className="form-group">
            <label>Video Length Preferences</label>
            <div className="preferences-grid">
              <div className="preference-item">
                <span>1st Choice:</span> {userData?.time_choice_one}
              </div>
              <div className="preference-item">
                <span>2nd Choice:</span> {userData?.time_choice_two}
              </div>
              <div className="preference-item">
                <span>3rd Choice:</span> {userData?.time_choice_three}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;