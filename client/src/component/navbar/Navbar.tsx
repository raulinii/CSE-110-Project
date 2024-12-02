import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaHome, FaClock, FaUser } from "react-icons/fa";
import "./Navbar.css"; // Ensure correct import

interface NavItem {
  label: string;
  url: string;
  icon: JSX.Element;
}

const Navbar = () => {
  const navItems: NavItem[] = [
    { label: "Home", url: "/main", icon: <FaHome /> },
    { label: "Clock", url: "/Clock", icon: <FaClock /> },
    { label: "User", url: "/User", icon: <FaUser /> }
  ];

  const navigate = useNavigate(); // Initialize useNavigate

  // Track active item (optional)
  const initialUrl = localStorage.getItem("activeUrl") || "/";
  const [activeUrl, setActiveUrl] = useState<string>(initialUrl);

  const handleNavClick = (url: string) => {
    setActiveUrl(url);
    localStorage.setItem("activeUrl", url);
    navigate(url); // Navigate to the new route
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
      </ul>
    </nav>
  );
};



export default Navbar;
