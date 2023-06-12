import React from 'react';
import './public/index.css'; // Import the CSS file

function App() {
  return (
    <div className="index-container">
      <div className="welcome">
        <h2>The invoked one: a lost hero from the past</h2>
        <p>Hi, Welcome on our Website!</p>
        <a href="/src/site/html/description.html">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Click to enter
        </a>
      </div>
      <div className="img-welcome"></div>
    </div>
  );
}

export default App;
