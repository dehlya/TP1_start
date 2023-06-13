import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";

export class MenuLayout extends Layout {
  constructor(game) {
    super(game);
    this.background = "black";
    this.title = "The Invoked One";
    this.buttonWidth = 200;
    this.buttonHeight = 50;
    this.buttonSpacing = 20;

    this.buttons = [
      new Button("Play", () => game.state.toPlay()),
      new Button("Load game", () => game.state.toPause()),
      new Button("Settings", () => game.state.toSettings()),
      new Button("Credits", () => game.state.toCredit()),
    ];

    this.img = new Image();
    this.img.src = "../../../ressources/site/img-welcome.jpeg";
  }

  draw() {
    this.addBackground();
    this.addTitle();
    this.addButtons();
    super.draw();
  }

  addBackground() {
    this.context.fillStyle = this.background;
    this.context.fillRect(0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
    this.context.drawImage(this.img, 0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
  }

  addTitle() {
      const canvasWidth = this.game.canvas.getWidth();
      const titleFont = "64px 'Segoe Script', cursive";
      this.context.font = titleFont;
      const titleWidth = this.context.measureText(this.title).width;
      const titleX = (canvasWidth - titleWidth) / 2;
      const titleY = 100;
    
      this.context.fillStyle = "black";
      this.context.font = titleFont;
      this.context.fillText(this.title, titleX, titleY);      
  }

  addButtons() {
    this.context.font = "24px Arial";
    this.buttons.forEach((button, index) => {
      // Calculate position as percentage of canvas width and height
      const x = (this.game.canvas.getWidth() * 0.5) - (this.buttonWidth * 0.5);
      const y = (this.game.canvas.getHeight() * 0.3) + index * (this.buttonHeight + this.buttonSpacing);
  
      this.context.fillStyle = "grey";
      this.context.fillRect(x, y, this.buttonWidth, this.buttonHeight);
  
      this.context.fillStyle = "white";
      this.context.fillText(
        button.text,
        x + (this.buttonWidth - this.context.measureText(button.text).width) / 2,
        y + this.buttonHeight / 2 + 8
      );
      this.context.strokeRect(x, y, this.buttonWidth, this.buttonHeight);
    });
  }
}
