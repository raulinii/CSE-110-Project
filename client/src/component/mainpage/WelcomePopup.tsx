import React, { useState } from "react";
import "./WelcomePopup.css"; // Extract styles into a separate CSS file if needed.

const WelcomePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="overlay">
      <div className="popup">
        <h2>Welcome to Mindful U!</h2>
        <h4>How familiar are you with meditation?</h4>
        <button className="btn" onClick={onClose}>
          Beginner
        </button>
        <button className="btn" onClick={onClose}>
          Casual
        </button>
        <button className="btn" onClick={onClose}>
          Regular
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
