import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VideoPlayerView from './views/VideoPlayerView';
import MainPageView from './views/MainPageView';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path = "/" element = {<VideoPlayerView/>} /> */}
          <Route path = "/" element = {<MainPageView/>} />
          <Route path = "/player/sleep" element = {<VideoPlayerView/>} />
          <Route path = "/player/stress" element = {<VideoPlayerView/>} />
          <Route path = "/player/focus" element = {<VideoPlayerView/>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
};
export default App;
