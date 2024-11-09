import { VideoPlayer } from "../component/VideoPlayer";
import Navbar from "../component/navbar/Navbar";
import { ToggleMusicButton } from "../component/toggleMusic/ToggleMusicButton";
import { ToggleThemeButton } from "../component/toggleTheme/ToggleThemeButton";

const VideoPlayerView = () =>{
    return(      
        <div>
        <Navbar />
        <VideoPlayer/>
        <ToggleMusicButton />
        <ToggleThemeButton />
        </div>
        )
}

export default VideoPlayerView;