import { useRef, useState } from "react";
import { FaMusic } from "react-icons/fa";
import "../ToggleButton.css";

export function ToggleMusicButton( ){
    const musicList = [
        { src: "", color: "black" },
        { src: "/musics/lofi.mp3", color: "yellow" },
        { src: "/musics/piano.mp3", color: "blue" },
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
    }   
    const handleCanPlay = () => {
        if (audioRef.current) {
            audioRef.current.loop = true; // Enable looping
            audioRef.current.play(); // Start playing once it's ready
        }
      };
    return (<div>
                 <button 
                 className="music-button"
                 onClick={handleToggleMusic}>
                    <FaMusic color={musicList[currentMusic].color} />
                 </button>
                 <audio ref={audioRef} src={musicList[currentMusic].src} onCanPlay={handleCanPlay}  />
            </div>
            
        )
    
} 
export default ToggleMusicButton
