import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function App() {
  const [redirectToDescription, setRedirectToDescription] = useState(false);

  const handleEnterClick = () => {
    setRedirectToDescription(true);
  };

  if (redirectToDescription) {
    return <Redirect to="/description" />;
  }

  return (
    <div className="index-container">
      <div className="welcome">
        <h2>The invoked one: a lost hero from the past</h2>
        <p>Hi, Welcome on our Website!</p>
        <button onClick={handleEnterClick}>Click here to enter</button>
      </div>
      <div className="img-welcome"></div>
    </div>
  );
}

export default App;
