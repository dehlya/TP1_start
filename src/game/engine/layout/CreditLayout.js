import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";
export class CreditLayout extends Layout {
  constructor(game) {
    super(game);
    this.background = "black";
    this.title = "Credits";
    this.buttonWidth = this.game.canvas.getWidth()/4;
    this.buttonHeight = this.game.canvas.getHeight()/8;

    this.backButton = new Button("Back", () => game.state.toMenu());
  }

  draw() {
    this.addBackground();
    this.addTitle();
    this.addCredits();
    this.addButton();
    super.draw();
  }

  addButton() {
    const x = this.game.canvas.getWidth() * 0.5 - this.buttonWidth / 2;
    const y = this.game.canvas.getHeight() * 0.8; 
    this.context.fillStyle = "grey";
    this.context.fillRect(x, y, this.buttonWidth, this.buttonHeight);
  
    this.context.fillStyle = "white";
    this.context.font = this.game.canvas.getHeight()/15+"px Arial";
    this.context.fillText(
      this.backButton.text,
      x + (this.buttonWidth - this.context.measureText(this.backButton.text).width) / 2,
      y + this.buttonHeight / 2 + this.game.canvas.getHeight()/40
    );
    this.context.strokeRect(x, y, this.buttonWidth, this.buttonHeight);
  }
  
  addBackground() {
    this.context.fillStyle = this.background;
    this.context.fillRect(
      0,
      0,
      this.game.canvas.getWidth(),
      this.game.canvas.getHeight()
    );
  }
  addTitle() {
    this.context.fillStyle = "white";
    this.context.font = this.game.canvas.getHeight()/10+"px Arial";
    this.context.fillText(this.title, 10, 50);
  }

  addCredits() {
    this.context.fillStyle = "white";
    this.context.font = this.game.canvas.getHeight()/20+"px Arial";

    const credits = [
      { role: "Game Director", name: "Tony" },
      { role: "Lead Designer", name: "Dehlya" },
      { role: "Programmer", name: "Pedro" },
      { role: "Artist", name: "Marie-Esther" },
    ];

    let yPosition = 100;

    credits.forEach((credit) => {
      const creditText = `${credit.role}: ${credit.name}`;
      const xPosition =
        (this.game.canvas.getWidth() -
          this.context.measureText(creditText).width) /
        2;
      this.context.fillText(creditText, xPosition, yPosition);
      yPosition += 30;
    });
  }
}
