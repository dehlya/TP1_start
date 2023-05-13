import { SCREEN_RATIO } from "./Constants.js";
import { Canvas } from "./engine/canvas/Canvas.js";
import { Game } from "./Game.js";

$(document).ready(function () {
  let canvas = new Canvas();
  let height, width;
  getCanvasSize();

  let game = new Game(canvas, height, width); 
  //TODO: window resize + change with ratio
  game.start();

});

function getCanvasSize() {
  let isLandscape = (window.innerHeight<window.innerWidth && window.innerWidth/SCREEN_RATIO <= window.innerHeight || window.innerHeight*SCREEN_RATIO >= window.innerWidth)? true : false;

  if(isLandscape){
    width = document.getElementById('canvas').clientWidth;
    height = width/SCREEN_RATIO;
  }else{
    height = window.innerHeight *0.9;
    width = height*SCREEN_RATIO;
  }
}

window.addEventListener("resize", () => {
    //TODO : responsive page resize too 
    getCanvasSize();
    game.resize(width, height);
})
