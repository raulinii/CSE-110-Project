// src/App.tsx
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPageView from './views/MainPageView';
import StopwatchTimer from './component/StopwatchTimer';
import Layout from './Layout'; // Import the Layout component
import SleepVideoView from './views/SleepVideoView';
import StressVideoView from './views/StressVideoView';
import FocusVideoView from './views/FocusVideoView';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}> {/* Use Layout as a wrapper */}
            <Route path="/" element={<MainPageView />} />
            <Route path="/Clock" element={<StopwatchTimer />} />
            <Route path="/player/sleep" element={<SleepVideoView />} />
            <Route path="/player/stress" element={<StressVideoView />} />
            <Route path="/player/focus" element={<FocusVideoView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;