import { SCREEN_RATIO } from "./Constants.js";
import { Canvas } from "./engine/canvas/Canvas.js";
import { Game } from "./Game.js";

    let canvas = new Canvas();
    let width = window.innerWidth * 0.8;
    let height = width/SCREEN_RATIO;
    let game = new Game(canvas, height, width); 
    //TODO: window resize + change with ratio
    game.start();

    document.addEventListener('keydown', recordKey);

    function recordKey(e) {
      console.log(e.code);
    }