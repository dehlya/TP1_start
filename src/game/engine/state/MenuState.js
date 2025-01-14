import { MenuLayout } from "../layout/MenuLayout.js";
import { State } from "./State.js";
import { KeyHandler } from "../handler/KeyHandler.js";
import {PlayState} from "./PlayState.js";

export class MenuState extends State {
  constructor(game) {
    super(game, "Menu");

    this.layout = new MenuLayout(this.game);
    this.layout.hardFrontier = true;
    this.keyHandler = new KeyHandler();
    this.addCallbacks();
  }

  handleClick(event) {
    if (this.game.state !== this) return;
    let rect = this.game.canvas.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
  
    this.layout.buttons.forEach((button, index) => {
      // Update the startX and startY calculations
      let startX = (this.game.canvas.getWidth() * 0.5) - (this.layout.buttonWidth * 0.5);
      let startY = (this.game.canvas.getHeight() * 0.3) + index * (this.layout.buttonHeight + this.layout.buttonSpacing);
  
      if (
        x >= startX &&
        x <= startX + this.layout.buttonWidth &&
        y >= startY &&
        y <= startY + this.layout.buttonHeight
      ) {
        button.onClick();
      }
      
    });
  }
  
  toPlay() {
    this.game.setCurrentState("Play");
    this.game.state.setLayout();
    this.game.fullscreen();
  }

  toPause() {
    this.game.setCurrentState("Pause");
  }

  toSettings() {
    this.game.setCurrentState("Settings");
  }

  toCredit() {
    this.game.setCurrentState("Credits");

  }

  render() {
    this.layout.draw();
  }
  enter() {
    super.enter();
    this.handleClickBound = this.handleClick.bind(this);
    this.game.canvas.canvas.addEventListener('click', this.handleClickBound);
  }
  
  exit() {
    super.exit();
    this.game.canvas.canvas.removeEventListener('click', this.handleClickBound);
  }
  
  addCallbacks() {
    this.keyHandler.addCallback('KeyF', 'keydown', () => this.game.fullscreen());

  }
}
