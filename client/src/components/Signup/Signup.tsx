// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import './SignupStyle.css';
// import WelcomePopup from "./WelcomePopup"; // Import the popup component


// const Signup: React.FC = () => {
//     const [email, setEmail] = useState<string>('');
//     const [username, setUsername] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [confirmPassword, setConfirmPassword] = useState<string>('');
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [showPopup, setShowPopup] = useState(true); // Popup state

//     const handleClosePopup = () => {
//         setShowPopup(false); // Close popup when a button is clicked
//         navigate('/main');
//     };

//     const navigate = useNavigate();

//     const handleSignup = async (event: React.FormEvent) => {
//         event.preventDefault();
//         if (password !== confirmPassword) {
//             setErrorMessage("Passwords do not match.");
//             return;
//         }

//         try {
//             {showPopup && <WelcomePopup onClose={handleClosePopup} />}
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Store user data in Firestore
//             const userRef = doc(db, "dummy", user.uid);
//             await setDoc(userRef, {
//                 Email: email,
//                 Username: username,
//                 Password: password, // Avoid plaintext in production
//                 familiarity: "Beginner", // Default value
//                 time_choice_one: "Long", // Default value
//                 time_choice_two: "Median", // Default value
//                 time_choice_three: "Short" // Default value
//             });

//             console.log("User signed up and data stored in Firestore:", user);
//             setErrorMessage(null);
            
//         } catch (error: any) {
//             setErrorMessage(error.message);
//         }
//     };

//     return (
//         <div className="container">
//             <form className="signup" onSubmit={handleSignup}>
//                 <h1>Can’t wait to get you started!</h1>
//                 {errorMessage && <p className="error-message">{errorMessage}</p>}
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Sign Up</button>
//             </form>
//             <p className="footer-text">MindfulU</p>
//         </div>
//     );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import WelcomePopup from "./WelcomePopup";
import "./SignupStyle.css";

const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false); // Initially false
    const navigate = useNavigate();

    const handleClosePopup = () => {
        setShowPopup(false); // Close the popup
        navigate("/main"); // Navigate to the main page
    };

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user data in Firestore
            const userRef = doc(db, "dummy", user.uid);
            await setDoc(userRef, {
                Email: email,
                Username: username,
                Password: password, // Avoid plaintext passwords in production
                familiarity: "Beginner", // Default value
                time_choice_one: "Long", // Default value
                time_choice_two: "Median", // Default value
                time_choice_three: "Short", // Default value
            });

            console.log("User signed up and data stored in Firestore:", user);
            setErrorMessage(null);

            // Show the popup
            setShowPopup(true);
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="container">
            <form className="signup" onSubmit={handleSignup}>
                <h1>Can’t wait to get you started!</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p className="footer-text">MindfulU</p>

            {/* Render the popup if showPopup is true */}
            {showPopup && <WelcomePopup onClose={handleClosePopup} />}
        </div>
    );
};

export default Signup;
