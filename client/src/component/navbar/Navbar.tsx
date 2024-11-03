
import React, { useState } from "react";
import "./Navbar.css";

// Define the type for navigation items
interface NavItem {
  label: string;
  url: string;
}

const Navbar = () =>{

    const navItems: NavItem[] = [
        { label: "Home", url: "/home" },
        { label: "Clock", url: "/Clock" },
        { label: "User", url: "/User" }
    ];
    
      // State to track the active item
    const [activeUrl, setActiveUrl] = useState<string>(navItems[0].url);
    
    const handleNavClick = (url: string) => {
    setActiveUrl(url);
    window.location.href = url;
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
                {item.label}
            </button>
            </li>
        ))}
        </ul>
    </nav>
    );
};
    
export default Navbar;