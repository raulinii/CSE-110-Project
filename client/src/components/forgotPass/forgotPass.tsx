import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./forgotPassStyle.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError(null); // Clear any previous errors
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email.");
      setMessage(null); // Clear any previous success message
    }
  };

  return (
    <div className="container">
      <div className="forgot-password">
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
          />
          <button type="submit" className="loginButton">Send Reset Link</button>
        </form>
        <a href="/login" className="forgot-password">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
