import React, { useEffect } from 'react';
import { Game } from '../game/Game.js'; // Update the path to game.js based on the folder structure

function ScriptComponent() {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script1.type = 'module';
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'module';
    script2.textContent = Game; // Set the content of the script tag to the contents of game.js
    document.body.appendChild(script2);

    return () => {
      // Clean up the dynamically added scripts when the component unmounts
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null;
}

export default ScriptComponent;
