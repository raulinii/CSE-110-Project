import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import './SignupStyle.css';
import { auth } from "../../firebase"; // Import from your firebase initialization

const Signup: React.FC = () => {
    // State for user inputs
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>(''); // Currently unused, but stored
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Handle sign-up form submission
    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent form reload on submit

        // Validate password match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed up:", user); // Debugging/logging user information
            setErrorMessage(null); // Clear error message if successful
            // Implement redirect or success message (depending on app flow)
        } catch (error: any) {
            setErrorMessage(error.message); // Handle and display Firebase error
        }
    };

    return (
        <div className="container">
            <form className="signup" onSubmit={handleSignup}>
                <h1>Can’t wait to get you started!</h1>
                {/* Display error messages */}
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
