
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
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
    const initialUrl =  localStorage.getItem("activeUrl") || '/home';
    const [activeUrl, setActiveUrl] = useState<string>(initialUrl);
    
    const handleNavClick = (event: React.MouseEvent<HTMLButtonElement>,url: string) => {
        setActiveUrl(url);
        localStorage.setItem("activeUrl", url);
        window.location.href = url;
    };

    return (
    <nav className="navbar">
        <ul className="nav-list">
        {navItems.map((item) => (
            <li key={item.url} className="nav-item">
            <button
                className={`nav-button ${activeUrl === item.url ? "active" : ""}`}
                onClick={(event) => handleNavClick(event,item.url)}
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