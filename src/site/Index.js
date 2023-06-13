import React from 'react';
import { Link } from 'react-router-dom';
import './css/index.css';
import './css/font.css';

function Index() {
  return (
    <div className="index-container">
      <div className="welcome">
        <h2>The invoked one: a lost hero from the past</h2>
        <p>Hi, Welcome to our Website!</p>
        <button onClick>
          <li>
            <Link to="/description">Click here to enter</Link>
          </li>
          </button>
      </div>
      <div className="img-welcome"></div>
    </div>
  );
}

export default Index;
