import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './SignupStyle.css';

const Signup: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

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
                Password: password, // Avoid plaintext in production
                familiarity: "Beginner", // Default value
                time_choice_one: "Long", // Default value
                time_choice_two: "Median", // Default value
                time_choice_three: "Short" // Default value
            });

            console.log("User signed up and data stored in Firestore:", user);
            setErrorMessage(null);
            navigate('/main');
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
        </div>
    );
};

export default Signup;
