import { GameOverState } from "./engine/state/GameOverState.js";
import { PlayState } from "./engine/state/PlayState.js";
import { MenuState } from "./engine/state/MenuState.js";
import { CreditState } from "./engine/state/CreditState.js";
import { PauseState } from "./engine/state/PauseState.js";
import { LogoState } from "./engine/state/LogoState.js";
import { Player } from "./engine/Player/Player.js";
import { SettingsState } from "./engine/state/SettingsState.js";
import { MS_PER_FRAME } from "./Constants.js";
export class Game {
  constructor(canvas, height, width) {
    this.previousTime = 0;
    this.currentTime = 0;
    this.passedTime = 0;
    this.msPerFrame = MS_PER_FRAME;

    this.canvas = canvas;
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);

    
  }

  start() {
    this.init();
    this.run();
  }

  init() {
    this.previousTime = new Date().getTime();

    this.player = new Player();

    this.StatesMap = new Map();
    this.StatesMap.set("Play", new PlayState(this));
    this.StatesMap.set("Menu", new MenuState(this));
    this.StatesMap.set("Credits", new CreditState(this));
    this.StatesMap.set("GameOver", new GameOverState(this));
    this.StatesMap.set("Pause", new PauseState(this));
    this.StatesMap.set("Logo", new LogoState(this));
    this.StatesMap.set("Settings", new SettingsState(this));

    this.state = this.StatesMap.get("Logo");
    this.state.enter();
    this.render();
  }

  run() {
    this.playGameTime = 0;
    this.currentTime = new Date().getTime();
    this.passedTime += this.currentTime - this.previousTime;
    this.previousTime = this.currentTime;


    while (this.passedTime >= this.msPerFrame)
    {
        console.log("loop");
        this.game.render();
        this.passedTime -= this.msPerFrame;
    }
  }
  setCurrentState(state) {
    this.state.exit();
    this.state = this.StatesMap.get(state);
    this.state.enter();
    this.render();
  }
  render() {
    this.canvas.cleanCanvas(this.state);
    console.log("clean");
    this.state.render();
    console.log("render");
  }
  fullscreen(){
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.canvas.setFullscreen(false);
      this.render();
    } else {
      document.getElementById('canvas').requestFullscreen();
      this.canvas.setFullscreen(true);
      this.render();
    }
  }
  setMsPerFrame(isPlayState) {
    //true is in PlayState
    //false is in other states
    if(isPlayState){
      this.msPerFrame = MS_PER_FRAME_PLAY;
    }else{
      this.msPerFrame = MS_PER_FRAME;
    }
  }
}
