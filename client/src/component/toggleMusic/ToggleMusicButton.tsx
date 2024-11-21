import { useRef, useState } from "react";
import { FaMusic } from "react-icons/fa";
import { ThemeContext, themes } from "../../context/ThemeContext";
import "../ToggleButton.css";

export function ToggleMusicButton( ){
    const musicList = [
        { src: "/music/music1.mp3", color: "black" },
        { src: "/music/music2.mp3", color: "yellow" },
        { src: "/music/music3.mp3", color: "blue" },
    ];
     // State to track the current music index and color
  const [currentMusic, setCurrentMusic] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
    const handleToggleMusic = () => {
        //stop current music
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        //switch to next song
        const nextMusic = (currentMusic + 1) % musicList.length;
        setCurrentMusic(nextMusic);
        //play the next song
        if (audioRef.current) {
            audioRef.current.src = musicList[nextMusic].src;
            audioRef.current.play();
          }
    }   
    return (<div>
                 <button 
                 className="music-button"
                 onClick={handleToggleMusic}>
                    <FaMusic color={musicList[currentMusic].color} />
                 </button>
                 {/* <audio ref={audioRef} src={musicList[currentMusic].src} /> //change to real music */}
            </div>
            
        )
    // return<FaMusic/>
    
}