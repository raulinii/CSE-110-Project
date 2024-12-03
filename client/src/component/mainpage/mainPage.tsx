import React from "react";
import { useNavigate } from "react-router-dom";
import "./mainPage.css";
import { FaMusic, FaMoon } from "react-icons/fa";
import logo from "./images/logo.png";
import mapIcon from "./images/map.png";
import capsIcon from "./images/caps.png";
import ucsdIcon from "./images/ucsd.webp";
import { ToggleThemeButton } from "../toggleTheme/ToggleThemeButton";
import ToggleMusicButton from "../toggleMusic/ToggleMusicButton";

const CATEGORIES = [
    { id: 1, category: "Sleep" },
    { id: 2, category: "Stress" },
    { id: 3, category: "Focus" }
] as const;

function MainPage() {
    const navigate = useNavigate();

    const handleCategoryClick = (category: string) => {
        navigate(`/player/${category.toLowerCase()}`);
    };
            
    return (
        <div className="main-page">
            {/* <header className="header"> */}
                <div className="logo">
                    <img src={logo} alt="MindfulU Logo" className="logo-image" />
                    <span>Mindful U</span>
                </div>
            {/* </header> */}   

            <main className="main-content">
                <div className="categories-wrapper">
                    <div className="categories-container">
                        {CATEGORIES.map((item) => (
                            <button
                                key={item.id}
                                className="category-box"
                                onClick={() => handleCategoryClick(item.category)}
                            >
                                {item.category}
                            </button>
                        ))}
                    </div>
                </div>

                <section className="resources-section">
                    <h2>Mental Health Resources:</h2>
                    <div className="resources-list">
                        <a href="https://studenthealth.ucsd.edu/services/mental-health/index.html" 
                           className="resource-item"
                           target="_blank"
                           rel="noopener noreferrer">
                            <img src={ucsdIcon} alt="UCSD Health" />
                            <span>Mental Health Resource</span>
                        </a>
                        <a href="https://students.ucsd.edu/sponsor/ethics-spirit/meditation.html"
                           className="resource-item"
                           target="_blank"
                           rel="noopener noreferrer">
                            <img src={mapIcon} alt="Meditation" />
                            <span>Meditation Location</span>
                        </a>
                        <a href="https://caps.ucsd.edu/"
                           className="resource-item"
                           target="_blank"
                           rel="noopener noreferrer">
                            <img src={capsIcon} alt="CAPS" />
                            <span>CAPS</span>
                        </a>
                    </div>
                </section>
            </main>

            <footer className="controls-wrapper">
                <div className="controls-container">
                    <ToggleMusicButton />
                    <ToggleThemeButton />
                </div>
            </footer>
        </div>
    );
}

export default MainPage;