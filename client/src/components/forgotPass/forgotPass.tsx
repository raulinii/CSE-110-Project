import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./forgotPassStyle.css";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setMessage(null); // Clear any previous messages
    setError(null); // Clear any previous errors
    
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + '/login', // Redirect URL after password reset
      });
      setMessage("Password reset email sent! Check your inbox.");
      setEmail(""); // Clear email field after success
    } catch (err: any) {
      // More specific error messages
      if (err.code === 'auth/user-not-found') {
        setError("No account exists with this email address.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Failed to send password reset email. Please try again.");
      }
      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <div className="container">
      <div className="forgot-password-form">
        <h2>Forgot Password</h2>
        <p>Enter your email address below, and we'll send you a reset link.</p>
        {message && <p style={{ color: "green", fontSize: "14px" }}>{message}</p>}
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !email}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <Link to="/login" className="back-to-login">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;