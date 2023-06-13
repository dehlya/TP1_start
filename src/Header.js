import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>HES-SO Vs - 64-31 - HTML/CSS/JavaScript</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Description</Link>
          </li>
          <li>
            <Link to="/sketch">Sketch</Link>
          </li>
          <li>
            <Link to="/mockup">Mockup</Link>
          </li>
          <li>
            <Link to="/flow">Flow</Link>
          </li>
          <li>
            <Link to="/logbook">Logbook</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
