import React, { useEffect, useState } from "react";
import { getMeditations } from "../services/firebaseServices"
import ReactPlayer from "react-player";
import Navbar from "../component/navbar/Navbar";
import { ToggleMusicButton } from "../component/toggleMusic/ToggleMusicButton";
import { ToggleThemeButton } from "../component/toggleTheme/ToggleThemeButton";
import { Meditation } from "../types/Meditation";
import '../component/VideoPlayer.css';

const FocusVideoView: React.FC = () => {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        setLoading(true);
        const data = await getMeditations("Focus"); // Fetch meditations with category "Sleep"
        setMeditations(data);
      } catch (err) {
        setError("Failed to fetch meditations. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeditations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
        <Navbar />
        <div>
        <h1>Focus Meditations</h1>
        <div>
                {meditations.map((video) => (
                <div 
                key={video.id}
                className='video-player-container'>
                    <ReactPlayer url={video.link} />
                </div>
            ))}
            </div>
        </div>
            
        <ToggleMusicButton />
        <ToggleThemeButton />
    </div>
  );
};

export default FocusVideoView;
