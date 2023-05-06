import { State } from "./State.js";
import { CreditLayout } from "../layout/CreditLayout.js";
export class CreditState extends State {
  constructor(game) {
    super(game);
    this.layout = new CreditLayout(game);

    game.canvas.canvas.addEventListener("click", (event) =>
      this.handleClick(event)
    );
  }

  handleMouseMove(event) {
    let rect = this.game.canvas.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let startX = this.game.canvas.getWidth() - this.layout.buttonWidth - 10;
    let startY = this.game.canvas.getHeight() - this.layout.buttonHeight - 10;

    this.layout.backButton.hover =
      x >= startX &&
      x <= startX + this.layout.buttonWidth &&
      y >= startY &&
      y <= startY + this.layout.buttonHeight;
  }

  handleClick(event) {
    if (this.game.state !== this) return;
    let rect = this.game.canvas.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let startX = (this.game.canvas.getWidth() - this.layout.buttonWidth) / 2;
    let startY = this.game.canvas.getHeight() - this.layout.buttonHeight - 10;

    if (
      x >= startX &&
      x <= startX + this.layout.buttonWidth &&
      y >= startY &&
      y <= startY + this.layout.buttonHeight
    ) {
      this.layout.backButton.onClick();
    }
  }

  toMenu() {
    this.game.setCurrentState(this.game.menuState);
  }

  render() {
    this.layout.draw();
  }
}
