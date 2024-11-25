import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaHome, FaClock, FaUser, FaMoon, FaSun } from "react-icons/fa";
import "./Navbar.css";

interface NavItem {
  label: string;
  url: string;
  icon: JSX.Element;
}

const Navbar = () => {
  const navItems: NavItem[] = [
    { label: "Home", url: "/", icon: <FaHome /> },
    { label: "Clock", url: "/Clock", icon: <FaClock /> },
    { label: "User", url: "/User", icon: <FaUser /> }
  ];

  const navigate = useNavigate();
  const initialUrl = localStorage.getItem("activeUrl") || "/";
  const [activeUrl, setActiveUrl] = useState<string>(initialUrl);
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleNavClick = (url: string) => {
    setActiveUrl(url);
    localStorage.setItem("activeUrl", url);
    navigate(url);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.url} className="nav-item">
            <button
              className={`nav-button ${activeUrl === item.url ? "active" : ""}`}
              onClick={() => handleNavClick(item.url)}
            >
              <span className="icon">{item.icon}</span>
            </button>
          </li>
        ))}
        <li className="nav-item">
          <button className="nav-button" onClick={toggleDarkMode}>
            <span className="icon">
              {darkMode ? <FaSun /> : <FaMoon />}
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
