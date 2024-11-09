
import React, { useState } from "react";
import { FaHome, FaClock, FaUser} from "react-icons/fa";
import "./Navbar.css";

// Define the type for navigation items
interface NavItem {
  label: string;
  url: string;
  icon : any;
}

const Navbar = () =>{

    const navItems: NavItem[] = [
        { label: "Home", url: "/", icon: <FaHome/> },
        { label: "Clock", url: "/Clock", icon: <FaClock /> },
        { label: "User", url: "/User", icon: <FaUser /> }
    ];
    
    // State to track the active item
    const initialUrl =  localStorage.getItem("activeUrl") || '/home';
    const [activeUrl, setActiveUrl] = useState<string>(initialUrl);
    
    // Set active URL
    const handleNavClick = (url: string) => {
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