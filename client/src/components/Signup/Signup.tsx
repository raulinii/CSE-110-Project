import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import './SignupStyle.css';

const Signup: React.FC = () => {
    // Define state for inputs
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>(''); // Currently unused, but stored
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Handle sign-up logic
    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent form reload on submit

        // Basic password validation
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed up:", user);
            setErrorMessage(null); // Clear errors if successful
            // Redirect user or show success message (depending on app flow)
        } catch (error: any) {
            setErrorMessage(error.message); // Display Firebase error message
        }
    };

    return (
        <div className='container'>
            <form className='signup' onSubmit={handleSignup}>
                <h1>Can’t wait to get you started!</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error message */}
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
