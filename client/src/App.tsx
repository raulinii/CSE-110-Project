import React from 'react';
import MainPage from "./components/main/mainPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerPage from "./components/player/PlayerPage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/player/:category" element={<PlayerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
