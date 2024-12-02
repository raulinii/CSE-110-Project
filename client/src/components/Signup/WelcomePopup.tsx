import React, { useState } from "react";
import "./WelcomePopup.css";

interface WelcomePopupProps {
  onClose: (choice: string, rankings: { [key: string]: string }) => void; // Accepts the button label and rankings
}

const timePreferences = ["Long", "Median", "Short"];
const rankings = ["1st", "2nd", "3rd"];

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose }) => {
  const [selectedRankings, setSelectedRankings] = useState<{ [key: string]: string }>({
    "1st": "",
    "2nd": "",
    "3rd": "",
  });

  const [familiarity, setFamiliarity] = useState<string>(""); // Store selected familiarity

  const handleDropdownChange = (rank: string, preference: string) => {
    setSelectedRankings((prev) => {
      const updated = Object.fromEntries(
        Object.entries(prev).map(([key, value]) => [key, value === preference ? "" : value])
      );
      return { ...updated, [rank]: preference };
    });
  };

  const handleSubmit = () => {
    if (!familiarity) {
      alert("Please select your familiarity with meditation.");
      return;
    }
    if (Object.values(selectedRankings).includes("")) {
      alert("Please rank all time preferences before proceeding.");
      return;
    }
    onClose(familiarity, selectedRankings); // Pass familiarity and rankings
  };

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Welcome to Mindful U!</h2>
        <h4>How familiar are you with meditation?</h4>
        <button
          className={`btn ${familiarity === "Beginner" ? "btn-dark" : ""}`}
          onClick={() => setFamiliarity("Beginner")}
        >
          Beginner
        </button>
        <button
          className={`btn ${familiarity === "Casual" ? "btn-dark" : ""}`}
          onClick={() => setFamiliarity("Casual")}
        >
          Casual
        </button>
        <button
          className={`btn ${familiarity === "Regular" ? "btn-dark" : ""}`}
          onClick={() => setFamiliarity("Regular")}
        >
          Regular
        </button>

        <h4>Rank your time preferences:</h4>
        <div className="time-preference-dropdowns">
          {rankings.map((rank) => (
            <div key={rank} className="time-preference-item">
              <label htmlFor={rank} className="time-preference-label">
                {rank}:
              </label>
              <select
                id={rank}
                value={selectedRankings[rank]}
                onChange={(e) => handleDropdownChange(rank, e.target.value)}
                className="time-preference-select"
              >
                <option value="">Select</option>
                {timePreferences.map((preference) => (
                  <option
                    key={preference}
                    value={preference}
                    disabled={Object.values(selectedRankings).includes(preference)}
                  >
                    {preference}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button className="btn submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;

