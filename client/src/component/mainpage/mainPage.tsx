import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mainPage.css";
import logo from "./logo.png";
import mapIcon from "./map.png";
import capsIcon from "./caps.png";
import ucsdIcon from "./ucsd.webp";
import WelcomePopup from "./WelcomePopup"; // Import the popup component

interface Category {
    id: number;
    category: string;
}

const SAMPLE_CHOICES: Category[] = [
    { id: 1, category: "Sleep" },
    { id: 2, category: "Stress" },
    { id: 3, category: "Focus" }
];

function MainPage() {
    const [categories] = useState(SAMPLE_CHOICES);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(true); // Popup state

    const handleClosePopup = () => {
        setShowPopup(false); // Close popup when a button is clicked
    };

    const handleCategoryClick = (category: string) => {
        navigate(`/player/${category.toLowerCase()}`);
    };

    return (
        <div className="main-page">
            {/* Show the popup if showPopup is true */}
            {showPopup && <WelcomePopup onClose={handleClosePopup} />}

            {/* Main Page Content */}
            {!showPopup && (
                <>
                    <div className="logo">
                        <img src={logo} alt="MindfulU Logo" className="logo-image" />
                        <span>Mindful U</span>
                    </div>
                    <div className="main-container">
                        <div className="category-wrapper">
                            <div className="category-container">
                                {categories.map((choice) => (
                                    <div
                                        key={choice.id}
                                        className="category-box"
                                        onClick={() => handleCategoryClick(choice.category)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="category-content">
                                            {choice.category}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Resources Section */}
                        <div className="resources-section">
                            <h3>Mental Health Resources:</h3>
                            <ul>
                                <li>
                                    <img src={ucsdIcon} alt="Resource Logo" className="resource-logo" />
                                    <a
                                        href="https://studenthealth.ucsd.edu/services/mental-health/index.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Mental Health Resource
                                    </a>
                                </li>
                                <li>
                                    <img src={mapIcon} alt="Resource Logo" className="resource-logo" />
                                    <a
                                        href="https://students.ucsd.edu/sponsor//ethics-spirit/meditation.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Meditation Location
                                    </a>
                                </li>
                                <li>
                                    <img src={capsIcon} alt="Resource Logo" className="resource-logo" />
                                    <a href="https://caps.ucsd.edu/" target="_blank" rel="noopener noreferrer">
                                        CAPS
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default MainPage;
