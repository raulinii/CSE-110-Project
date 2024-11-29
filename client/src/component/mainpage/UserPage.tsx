// // UserPage.tsx
// import React, { useState, useEffect } from 'react';
// import './UserPage.css';
// import logo from "./images/logo.png";

// interface UserSettings {
//   firstName: string;
//   lastName: string;
//   email: string;
//   videoLength: 'short' | 'medium' | 'long';
//   meditationExperience: 'Beginner' | 'Occasionally' | 'Regularly';
// }

// const UserPage: React.FC = () => {
//   const [userSettings, setUserSettings] = useState<UserSettings>({
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     videoLength: 'medium',
//     meditationExperience: 'Occasionally',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setUserSettings(prevSettings => ({
//       ...prevSettings,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you would typically send the updated settings to your backend
//     console.log('Updated settings:', userSettings);
//     // You can add a success message or redirect the user
//   };

//   return (
//     <div className="user-page">
//       <div className="logo">
//         <img src={logo} alt="MindfulU Logo" className="logo-image" />
//         <span>Mindful U</span>
//       </div>
//       <div className="user-container">
//         <h2>User Profile</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={userSettings.firstName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Last Name</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={userSettings.lastName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={userSettings.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="videoLength">Preferred Video Length</label>
//             <select
//               id="videoLength"
//               name="videoLength"
//               value={userSettings.videoLength}
//               onChange={handleChange}
//             >
//               <option value="short">Short</option>
//               <option value="medium">Medium</option>
//               <option value="long">Long</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="meditationExperience">Meditation Experience</label>
//             <select
//               id="meditationExperience"
//               name="meditationExperience"
//               value={userSettings.meditationExperience}
//               onChange={handleChange}
//             >
//               <option value="Beginner">Beginner</option>
//               <option value="Occasionally">Occasionally</option>
//               <option value="Regularly">Regularly</option>
//             </select>
//           </div>
//           <button type="submit" className="save-button">Save Changes</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserPage;


// src/component/user/UserPage.tsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc, Firestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
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
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const docRef = doc(db, "dummy", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="user-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="user-page">
        <div className="error">Please log in to view your profile</div>
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
      </div>
    </div>
  );
};

export default UserPage;