import React from 'react';
import { Link } from 'react-router-dom';
import './css/index.css';
import './css/font.css';

function Index() {
  return (
    <div className="index-container">
      <div className="welcome">
        <h2>The Invoked One: a lost hero from the past</h2>
        <p>Welcome to our React website !</p>
        <button onClick>
          <li>
            <Link to="/Introduction">Click here to enter</Link>
          </li>
          </button>
      </div>
      <div className="img-welcome"></div>
    </div>
  );
}

export default Index;


