// src/App.tsx
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VideoPlayerView from './views/VideoPlayerView';
import MainPageView from './views/MainPageView';
import StopwatchTimer from './component/StopwatchTimer';
import Layout from './Layout'; // Import the Layout component

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}> {/* Use Layout as a wrapper */}
            <Route path="/" element={<MainPageView />} />
            <Route path="/Clock" element={<StopwatchTimer />} />
            <Route path="/player/sleep" element={<VideoPlayerView />} />
            <Route path="/player/stress" element={<VideoPlayerView />} />
            <Route path="/player/focus" element={<VideoPlayerView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;