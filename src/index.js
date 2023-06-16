import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Introduction from './site/Introduction'
import Logbook from './site/Logbook'
import Result from './site/Result'
import Links from './site/Links'
import GamePage from './site/gamePage'


function RedirectToIndex() {
    return <Navigate to="/Introduction" replace />;
  }
  
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="introduction" element={<Introduction />} />
        <Route path="logbook" element={<Logbook />} />
        <Route path="Result" element={<Result />} />
        <Route path="links" element={<Links />} />
        <Route path="game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
  );
