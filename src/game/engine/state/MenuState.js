import { MenuLayout } from "../layout/MenuLayout.js";
import { State } from "./State.js";

export class MenuState extends State {
  constructor(game) {
    super(game, "Menu");

    this.layout = new MenuLayout(this.game);
    this.layout.hardFrontier = true;
    game.canvas.canvas.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    game.canvas.canvas.addEventListener("click", (event) =>
      this.handleClick(event)
    );
    this.keyHandler = new KeyHandler();
  }

  handleClick(event) {
    if (this.game.state !== this) return;
    console.log("Mouse clicked");
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
        console.log(`Button clicked: ${button.text}`);
        button.onClick();
      }
      
    });
  }
  
  toPlay() {
    console.log("Play button clicked");
    this.game.setCurrentState(this.game.playState);
  }

  toPause() {
    console.log("Load Game button clicked");
    this.game.setCurrentState("Pause");

  }

  toSettings() {
    console.log("Settings button clicked");
    this.game.setCurrentState(this.game.settingsState);
  }

  toCredit() {
    console.log("Credits button clicked");
    this.game.setCurrentState("Credits");

  }

  render() {
    console.log("MenuState render called");
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
}
}
