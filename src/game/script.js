import { Canvas } from "./engine/canvas/Canvas.js";
import { Game } from "./Game.js";

    let canvas = new Canvas();
    let game = new Game(canvas, 600, 800);
    game.start();


