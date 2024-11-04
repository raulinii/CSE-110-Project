import React, { useState } from "react";
import "./mainPage.css";
import logo from "./logo.png";
import mapIcon from "./map.png"
import capsIcon from "./caps.png"

interface Category {
    id: number;
    category: string;
}

const SAMPLE_CHOICES: Category[] = [
    { id: 1, category: "Sleep" },
    { id: 2, category: "Stress" },
    { id: 3, category: "Focus" }
];

const MainPage: React.FC = () => {
    const [categories] = useState(SAMPLE_CHOICES);

    return (
        <div className="main-page">
            <div className="logo">
                <img src={logo} alt="MindfulU Logo" className="logo-image" />
                <span>MindfulU</span>
            </div>
            <div className="main-container">
                <div className="category-wrapper">
                    <div className="category-container">
                        {categories.map((choice) => (
                            <div key={choice.id} className="category-box">
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
                        <li>Mental Health Resource</li>
                        <li>
                            <img src={mapIcon} alt="Map Icon" className="icon" />
                            Meditation Location
                        </li>
                        <li>
                            <img src={capsIcon} alt="CAPS Icon" className="icon" />
                            CAPS
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MainPage;