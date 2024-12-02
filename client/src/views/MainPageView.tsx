import MainPage from "../component/mainpage/mainPage";
import Navbar from "../component/navbar/Navbar";
import { ToggleMusicButton } from "../component/toggleMusic/ToggleMusicButton";
import { ToggleThemeButton } from "../component/toggleTheme/ToggleThemeButton";

const VideoPlayerView = () =>{
    return(      
        <div>
        <Navbar />
        <MainPage/>
        <ToggleMusicButton />
        <ToggleThemeButton />
        </div>
        )
}

export default VideoPlayerView;