import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./component/navbar/Navbar"
import { ToggleThemeButton } from './component/toggleTheme/ToggleThemeButton';
import { VideoPlayer } from './views/videoView';
import { Route, Routes } from 'react-router-dom';
import { ToggleMusicButton } from './component/toggleMusic/ToggleMusicButton';

function App() {
  return (
    <div>
      <Navbar />
      {/* <Routes>
        <Route path="/" element={<VideoPlayer/>} />
      </Routes> */}
      <VideoPlayer/>
      <ToggleMusicButton />
      <ToggleThemeButton />
    </div>

  );
};
export default App;
