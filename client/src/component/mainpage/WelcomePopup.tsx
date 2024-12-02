import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePopup.css"; // Ensure to define styles here

const WelcomePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [showVideoLengthPopup, setShowVideoLengthPopup] = useState(false);
  const [meditationLevel, setMeditationLevel] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook to navigate back to main page

  const handleMeditationLevelSelection = (level: string) => {
    setMeditationLevel(level);
    setShowVideoLengthPopup(true);
  };

  const handleVideoLengthSelection = (length: string) => {
    // Store the selected video length (optional)
    console.log(`User selected meditation length: ${length}`);

    // Navigate back to the main page (or another route)
    onClose(); // Close the first popup
    navigate("/"); // Redirect user to the main page                               ****update as needed****
  };

  return (
    <div className="overlay">
      {/* First Popup (Meditation Familiarity Level) */}
      {!showVideoLengthPopup && (
        <div className="popup">
          <h2>Welcome to Mindful U!</h2>
          <h4>How familiar are you with meditation?</h4>
          <button
            className="btn"
            onClick={() => handleMeditationLevelSelection("Beginner")}
            title="I’ve never meditated or have tried it only a couple of times."
          >
            Beginner
          </button>
          <button
            className="btn"
            onClick={() => handleMeditationLevelSelection("Occasionally")}
            title="I meditate once in a while, but not regularly."
          >
            Occasionally
          </button>
          <button
            className="btn"
            onClick={() => handleMeditationLevelSelection("Regularly")}
            title="I meditate consistently as part of my routine."
          >
            Regularly
          </button>
        </div>
      )}

      {/* Second Popup (Video Length Selection) */}
      {showVideoLengthPopup && (
        <div className="popup">
          <h2>You selected: {meditationLevel}</h2>
          <h4>How long do you prefer your meditation videos?</h4>
          <button
            className="btn"
            onClick={() => handleVideoLengthSelection("Short")}
          >
            Short
          </button>
          <button
            className="btn"
            onClick={() => handleVideoLengthSelection("Medium")}
          >
            Medium
          </button>
          <button
            className="btn"
            onClick={() => handleVideoLengthSelection("Long")}
          >
            Long
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomePopup;
