import { Canvas } from "./engine/canvas/Canvas.js";
import { Game } from "./Game.js";

    let canvas = new Canvas();
    let game = new Game(canvas, 640, 1136); // RATIO : 16:9
    game.start();

    document.addEventListener('keydown', recordKey);

    function recordKey(e) {
      console.log(e.code);
    }

