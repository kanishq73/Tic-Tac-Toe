import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Twoplayer from './Components/Twoplayer/Twoplayer.jsx';
import Home from './Components/Home/Home.jsx';
import Computer from './Components/Computer/Computer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="Pass-N-Play" element={<Twoplayer />} />
          <Route path="Computer" element={<Computer />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
