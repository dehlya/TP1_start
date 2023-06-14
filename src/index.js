import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Description from './site/Description'
import Flow from './site/Flow'
import Logbook from './site/Logbook'
import Mockup from './site/Mockup'
import Sketch from './site/Sketch'
import GamePage from './site/gamePage'
import App from './site/App'


function RedirectToIndex() {
    return <Navigate to="/index" replace />;
  }
  
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToIndex />} /> {/* Redirect empty path to index */}
        <Route path="index" element={<App />} />
        <Route path="description" element={<Description />} />
        <Route path="flow" element={<Flow />} />
        <Route path="logbook" element={<Logbook />} />
        <Route path="mockup" element={<Mockup />} />
        <Route path="sketch" element={<Sketch />} />
        <Route path="game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
  );
