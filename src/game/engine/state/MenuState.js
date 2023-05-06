import { MenuLayout } from "../layout/MenuLayout.js";
import { State } from "./State.js";

export class MenuState extends State {
  constructor(game) {
    super(game);

    this.layout = new MenuLayout(this.game);
    this.layout.hardFrontier = true;
    game.canvas.canvas.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    game.canvas.canvas.addEventListener("click", (event) =>
      this.handleClick(event)
    );
  }

  handleMouseMove(event) {
    let rect = this.game.canvas.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    this.layout.buttons.forEach((button, index) => {
      let startX = (this.game.canvas.getWidth() - this.layout.buttonWidth) / 2;
      let startY =
        150 + index * (this.layout.buttonHeight + this.layout.buttonSpacing);
    });
  }
  handleClick(event) {
    if (this.game.state !== this) return;
    console.log("Mouse clicked");
    let rect = this.game.canvas.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    this.layout.buttons.forEach((button, index) => {
      let startX = (this.game.canvas.getWidth() - this.layout.buttonWidth) / 2;
      let startY =
        150 + index * (this.layout.buttonHeight + this.layout.buttonSpacing);

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
    console.log("Play button clicked");
  }

  toLoadGame() {
    console.log("Load Game button clicked");
  }

  toSettings() {
    console.log("Settings button clicked");
    this.game.setCurrentState(this.game.settingsState);
  }

  toCredit() {
    console.log("Credits button clicked");
    this.game.setCurrentState(this.game.creditState);
  }

  render() {
    console.log("MenuState render called");
    this.layout.draw();
  }
}
