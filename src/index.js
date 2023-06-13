import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Description from './site/Description'
import Flow from './site/Flow'
import Logbook from './site/Logbook'
import Mockup from './site/Mockup'
import Sketch from './site/Sketch'
import Game from './site/game'
import Index from './site/Index'


ReactDOM.render(
<BrowserRouter>
    <Routes>
        <Route path="index" element={<Index />} />
        <Route path="description" element={<Description />} />
        <Route path="flow" element={<Flow />} />
        <Route path="logbook" element={<Logbook />} />
        <Route path="mockup" element={<Mockup />} />
        <Route path="sketch" element={<Sketch />} />
        <Route path="game" element={<Game />} />
    </Routes>
</BrowserRouter>,
document.getElementById('root')
);

