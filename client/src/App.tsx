// src/App.tsx
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VideoPlayerView from './views/VideoPlayerView';
import MainPageView from './views/MainPageView';
import StopwatchTimer from './component/StopwatchTimer';
import Layout from './Layout';
import UserPage from './component/mainpage/UserPage'; // Add this import

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPageView />} />
            <Route path="/Clock" element={<StopwatchTimer />} />
            <Route path="/User" element={<UserPage />} /> {/* Add this route */}
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