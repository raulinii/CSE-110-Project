
import { ThemeContext, themes } from "../../context/ThemeContext";
import "../ToggleButton.css";
import React, { useState, useEffect } from "react";
import { FaHome, FaClock, FaUser, FaMoon, FaSun } from "react-icons/fa";



export function ToggleThemeButton() {
  const [darkMode, setDarkMode] = useState<boolean>(
      localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
      document.body.classList.toggle("dark-mode", darkMode);
      localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
      setDarkMode(!darkMode);
  };

  return (
      <button className="theme-button" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
      </button>
  );
}

  