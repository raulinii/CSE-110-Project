import ReactPlayer from 'react-player'
import './VideoPlayer.css';

export const VideoPlayer: React.FC = () => {

    return(<div className='video-player-container'>
        <ReactPlayer url='https://www.youtube.com/watch?v=1ZYbU82GVz4' />
        </div>) 
};

