import { PlayState } from "./engine/state/PlayState.js";
import { MenuState } from "./engine/state/MenuState.js";
import { CreditState } from "./engine/state/CreditState.js";
import { PauseState } from "./engine/state/PauseState.js";
import { LogoState } from "./engine/state/LogoState.js";
import { GameOverState } from "./engine/state/GameOverState.js";
import { Player } from "./engine/Player/Player.js";
import { SettingsState } from "./engine/state/SettingsState.js";
import { REFRESH_RATE } from "./Constants.js";
export class Game {
  constructor(canvas, height, width) {
    this.stateStack = [];
    this.canvas = canvas;
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);

  }

  /**
   * Init the game
   */
  init() {
    this.player = new Player();

    this.StatesMap = new Map();
    this.StatesMap.set("Play", new PlayState(this, "Play"));
    this.StatesMap.set("Menu", new MenuState(this, "Menu"));
    this.StatesMap.set("Credits", new CreditState(this));
    this.StatesMap.set("GameOver", new GameOverState(this, "GameOver"));
    this.StatesMap.set("Pause", new PauseState(this, "Pause"));
    this.StatesMap.set("Logo", new LogoState(this));
    this.StatesMap.set("Settings", new SettingsState(this, "Settings"));

    this.state = this.StatesMap.get("Logo");
    this.state.enter();
  }

  /**
   * Start the game
   */
  start() {
    this.run();
  }

  /**
   * Create the gameLoop X time per second (depend on the REFRESH_RATE configured)
   */
  run() {
    setInterval(() => {
      this.gameLoop();
    }, 1000 / REFRESH_RATE);
  }
  
  gameLoop() {
    this.render();
  } 

  setCurrentState(state, isGoBack=false) {
    if(this.state) {
      if(!isGoBack) {
        // Check if the new state is the same as the current state
        if (this.stateStack.length === 0 || this.stateStack[this.stateStack.length - 1].name !== state) {
          // Add condition to prevent stacking of two consecutive same states
          if (!this.state || this.state.name !== state) {
            this.stateStack.push(this.state);
          }
        }
        this.state.exit();
      } else {
        // Don't push the state onto the stack if we're going back
        this.state.exit();
      }
    }
    // Get the new state
    const newState = this.StatesMap.get(state);
  
    // Check if newState is defined before assigning it to this.state and calling enter
    if(newState) {
      this.state = newState;
      this.state.enter();
      this.render();
    } else {
      console.error('No state found with name:', state);
    }
  }

  goBack() {
    if(this.stateStack.length > 1) {
      // get the previous state
      this.setCurrentState(this.stateStack[this.stateStack.length - 1].name, true);
  
      console.log("Moved to : " + this.stateStack[this.stateStack.length - 1].name)
      
      // pop the current state
      console.log("statestack before pop")
      console.log(this.stateStack)
  
      this.stateStack.pop();
  
      console.log("statestack after pop")
      console.log(this.stateStack)
    } else {
      console.error('No previous state found');
    }
  
    console.log("New state:")
    console.log(this.state)
  
    if(this.stateStack.length > 0) {
      console.log("Old state:")
      console.log(this.stateStack[this.stateStack.length - 1].name)
    }
  }
  
  isCurrentlyRunning() {
    return this.state == this.StatesMap.get("Play");
  }

  render() {
    this.state.render();
  }

  fullscreen(){
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.canvas.setFullscreen(false);
      this.render();
    } else {
      document.getElementById('canvas').requestFullscreen();
      //this.canvas.setFullscreen(true);
      this.render();
    }
  }

  updateAnimation() {
    if (this.isAttacking) {
      this.startAttackAnimation();
    } else if (this.isMoving) {
      this.startMoveAnimation(this.currentMoveDirection);
    } else {
      // Handle other animation states here
    }
  }

  resize(width, height) {
    if (document.fullscreenElement) {
      //this.canvas.setFullscreen(true);
    }else{
      this.canvas.setWidth(width);
      this.canvas.setHeight(height);
    }
    this.render();
  }
}