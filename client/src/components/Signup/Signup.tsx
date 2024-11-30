import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import WelcomePopup from "./WelcomePopup";
import { query, where, getDocs, collection } from "firebase/firestore";
import "./SignupStyle.css";

const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false); 
    const [choice, setChoice] = useState<string | null>(null);
    const [rankings, setRankings] = useState<{ [key: string]: string }>({
        "1st": "",
        "2nd": "",
        "3rd": "",
      });

    const navigate = useNavigate();

    const handleClosePopup = async (selectedChoice: string,
                                    selectedRankings: { [key: string]: string } ) => {
        setChoice(selectedChoice);
        setRankings(selectedRankings);
        setShowPopup(false); 

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user data in Firestore
            const userRef = doc(db, "dummy", user.uid);
            await setDoc(userRef, {
                Email: email,
                Username: username,
                Password: password, 
                familiarity: selectedChoice, 
                time_choice_one: selectedRankings["1st"], 
                time_choice_two: selectedRankings["2nd"], 
                time_choice_three: selectedRankings["3rd"], 
            });

            console.log("User signed up and data stored in Firestore:", user);
            setErrorMessage(null);
        
        navigate("/main"); 
        console.log("Selected Choice:", selectedChoice); 
        console.log("Selected Ranking:", selectedRankings); 
    };

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const dummyCollection = collection(db, "dummy");
            const emailQuery = query(dummyCollection, where("Email", "==", email));
            const querySnapshot = await getDocs(emailQuery);
    
            if (!querySnapshot.empty) {
                setErrorMessage("This email is already registered. Please use a different email.");
                return; 
            }

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

            {showPopup && <WelcomePopup onClose={handleClosePopup} />}
        </div>
    );
};

export default Signup;


