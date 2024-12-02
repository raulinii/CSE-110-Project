import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mainPage.css";
import logo from "./images/logo.png";
import mapIcon from "./images/map.png";
import capsIcon from "./images/caps.png";
import ucsdIcon from "./images/ucsd.webp";

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


    const handleCategoryClick = (category: string) => {
        navigate(`/player/${category.toLowerCase()}`);
    };
    
    return (
        <div className="main-page">
            {/* Main Page Content */}
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
        </div>
    )};
    
    export default MainPage;