import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the path based on your folder structure
import './LoginStyle.css';

const Login: React.FC = () => {
    // State for user input and error handling
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Handle login logic
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload on form submission
        console.log("Attempting to log in with email:", email); // Log the email for debugging
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Login successful!");
            console.log("User details:", {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            });
            setErrorMessage(null); // Clear errors on successful login
            // Additional actions can go here, like redirecting the user
        } catch (error: any) {
            console.error("Login failed with error code:", error.code);
            console.error("Error message:", error.message);
            setErrorMessage("Failed to log in. Please check your email and password.");
        }
    };
    

    return (
        <div className='container'>
            <form className='login' onSubmit={handleLogin}>
                <h1>Welcome to MindfulU</h1>
                {/* Display login errors */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <a href="forgotPass" className="forgot-password">Forgot your password?</a>
                <button type="submit" className='loginButton'>Login</button>
                <Link to="/signup" className="signup">New user? Sign up here!</Link>
            </form>
        </div>
    );
};

export default Login;
