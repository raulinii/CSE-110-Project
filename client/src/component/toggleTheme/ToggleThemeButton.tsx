import { useContext, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { ThemeContext, themes } from "../../context/ThemeContext";
import "../ToggleButton.css";

export function ToggleThemeButton( ){
    // const theme = useContext(ThemeContext);
    const [currentTheme, setCurrentTheme] = useState(themes.light);
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    } 
    return(
      <div>
        <button 
        className="theme-button"
        onClick={toggleTheme}>
            <FaMoon color={currentTheme === themes.light ? 'navy' : 'white'} />
        </button>
      </div>
    )    
}