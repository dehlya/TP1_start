import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>HES-SO Vs - 64-31 - HTML/CSS/JavaScript</h1>
      <nav>
        <ul>
          <li>
            <Link to="/Introduction">Introduction</Link>
          </li>
          <li>
            <Link to="/Links">Links</Link>
          </li>
          <li>
            <Link to="/Result">Result</Link>
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
