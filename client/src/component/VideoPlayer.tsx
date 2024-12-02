import ReactPlayer from 'react-player'
import './VideoPlayer.css';
import {dummyVideoList} from '../constants/constants'

export const VideoPlayer: React.FC = () => {

    // return(<div className='video-player-container'>
    //     <ReactPlayer url='https://www.youtube.com/watch?v=1ZYbU82GVz4' />
    //     </div>) 
    return(
        <div>
            {dummyVideoList.map((video) => (
            <div 
            key={video.id}
            className='video-player-container'>
                <ReactPlayer url={video.link} />
            </div>
         ))}
        </div>
        
    )
};

