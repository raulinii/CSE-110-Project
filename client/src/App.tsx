import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./component/navbar/Navbar"
import { ToggleThemeButton } from './component/toggleTheme/ToggleThemeButton';
import { VideoPlayer } from './component/VideoPlayer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToggleMusicButton } from './component/toggleMusic/ToggleMusicButton';
import VideoPlayerView from './views/VideoPlayerView';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<VideoPlayerView/>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
};
export default App;
