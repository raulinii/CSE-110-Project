// RUDY UPDATE Memory Management
// React.memo prevents unnecessary re-renders of the navbar component9
// useCallback memoizes the click handler function, reducing memory allocation7
// Removing state updates for non-changing values reduces render cycles4

import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { FaHome, FaClock, FaUser } from "react-icons/fa";
import "./Navbar.css";

const navItems = [
  { label: "Home", url: "/main", icon: <FaHome /> },
  { label: "Clock", url: "/Clock", icon: <FaClock /> },
  { label: "User", url: "/User", icon: <FaUser /> }
] as const;

const Navbar = () => {
  const navigate = useNavigate();
  const activeUrl = localStorage.getItem("activeUrl") || "/";

  const handleNavClick = useCallback((url: string) => {
    localStorage.setItem("activeUrl", url);
    navigate(url);
  }, [navigate]);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.url} className="nav-item">
            <button
              aria-label={item.label}
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

export default React.memo(Navbar);