import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";

export class MenuLayout extends Layout {
  constructor(game) {
    super(game);
    this.background = "white";
    this.title = "THE INVOKED ONE";
    this.buttonWidth = this.game.canvas.getWidth()/4;
    this.buttonHeight = this.game.canvas.getHeight()/8;
    this.buttonSpacing = this.game.canvas.getHeight()/20;

    this.buttons = [
      new Button("PLAY", () => game.state.toPlay()),
      //new Button("Load game", () => game.state.toPause()),
      new Button("SETTINGS", () => game.state.toSettings()),
      new Button("CREDITS", () => game.state.toCredit()),
    ];

    this.img = new Image();
    this.img.src = "../../../ressources/site/background_dungeon_final_v3.png";
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
      const titleFont = this.game.canvas.getHeight()/6+"px 'Times new roman'";
      this.context.font = titleFont;
      const titleWidth = this.context.measureText(this.title).width;
      const titleX = (canvasWidth - titleWidth) / 2;
      const titleY = this.game.canvas.getWidth()/7;
    
      this.context.fillStyle = "white";
      this.context.font = titleFont;
      this.context.fillText(this.title, titleX, titleY);      
  }

  addButtons() {

    this.context.font = this.game.canvas.getHeight()/15+"px Times new roman";
    this.buttons.forEach((button, index) => {
      // Calculate position as percentage of canvas width and height
      const x = (this.game.canvas.getWidth() * 0.5) - (this.buttonWidth * 0.5);
      const y = (this.game.canvas.getHeight() * 0.3) + index * (this.buttonHeight + this.buttonSpacing);
  
      this.context.fillStyle = "white";
      this.context.fillRect(x, y, this.buttonWidth, this.buttonHeight);
  
      this.context.fillStyle = "black";
      this.context.fillText(
        button.text,
        x + (this.buttonWidth - this.context.measureText(button.text).width) / 2,
        y + this.buttonHeight / 2 + this.game.canvas.getHeight()/40
      );
      this.context.strokeRect(x, y, this.buttonWidth, this.buttonHeight);
    });
  }
}
