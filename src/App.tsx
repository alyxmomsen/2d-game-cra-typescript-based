import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import GameCanvas from './app/game/game-canvas';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<div>foo <Link to={'/game'}>bar</Link></div>} />
          <Route path='/game' element={<GameCanvas />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
