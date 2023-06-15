import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Introduction from './site/Introduction'
import Flow from './site/Flow'
import Logbook from './site/Logbook'
import Result from './site/Result'
import Links from './site/Links'
import GamePage from './site/gamePage'
import App from './site/App'


function RedirectToIndex() {
    return <Navigate to="/Introduction" replace />;
  }
  
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToIndex />} /> {/* Redirect empty path to index */}
        <Route path="Introduction" element={<Introduction />} />
        <Route path="flow" element={<Flow />} />
        <Route path="logbook" element={<Logbook />} />
        <Route path="Result" element={<Result />} />
        <Route path="Links" element={<Links />} />
        <Route path="game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
  );
