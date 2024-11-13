import React from "react";
import { useParams } from "react-router-dom";
import "./PlayerPage.css";

const imageSources = {
    sleep: "image.webp",    // Replace with actual image path
    stress: "/path/to/stress-image.jpg",  // Replace with actual image path
    focus: "/path/to/focus-image.jpg",    // Replace with actual image path
};

const PlayerPage = () => {
    const { category } = useParams<{ category: string }>();
    const displayedCategory = category ?? "sleep"; // Default to "sleep" if category is undefined

    return (
        <div className="player-page">
            <h1 className="page-title">
                {displayedCategory.charAt(0).toUpperCase() + displayedCategory.slice(1)} Resources
            </h1>

            <div className="content">
                {displayedCategory === "sleep" && (
                    <div>
                        <h2>Sleep Tips</h2>
                        <div className="image-container">
                            <img
                                src={imageSources.sleep}
                                alt="Helpful tips and resources for improving sleep."
                                width="800"
                                height="450"
                            />
                        </div>
                        <p>Some helpful tips and resources for improving sleep.</p>
                    </div>
                )}
                {displayedCategory === "stress" && (
                    <div>
                        <h2>Stress Management Tips</h2>
                        <div className="image-container">
                            <img
                                src={imageSources.stress}
                                alt="Strategies for managing stress and relaxation techniques."
                                width="800"
                                height="450"
                            />
                        </div>
                        <p>Strategies for managing stress and relaxation techniques.</p>
                    </div>
                )}
                {displayedCategory === "focus" && (
                    <div>
                        <h2>Focus Improvement Tips</h2>
                        <div className="image-container">
                            <img
                                src={imageSources.focus}
                                alt="Techniques to improve focus and reduce distractions."
                                width="800"
                                height="450"
                            />
                        </div>
                        <p>Techniques to improve focus and reduce distractions.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerPage;
