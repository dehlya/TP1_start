import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";

export class GameOverLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "../../../ressources/game/background/background_you_died.png";
        this.image = new Image();
        this.image.src = this.background;
        this.title = "Game Over";

        this.buttonWidth = this.game.canvas.getWidth()/5;
        this.buttonHeight = this.game.canvas.getHeight()/8;

        this.playAgainButton = new Button("Retry ?", () => this.game.state.playAgain());
        this.toMenuButton = new Button("Menu ?", () => this.game.state.toMenu());
        
    }
    draw() {
        this.addBackground();
        this.addTitle();
        this.addButtons();
        super.draw();
    }
    addButtons() {
        const x = this.game.canvas.getWidth() * 0.5 - this.buttonWidth / 2;
        const buttonMargin = this.game.canvas.getHeight() * 0.1; 
        const playAgainY = this.game.canvas.getHeight() * 0.5 + buttonMargin;

        this.addButton(this.playAgainButton);

      }
      
    addButton(button) {
        const x1 = this.game.canvas.getWidth() * 0.25 - this.buttonWidth/2 ;
        const x2 = this.game.canvas.getWidth() * 0.75 - this.buttonWidth/2 ;
        const y = this.game.canvas.getHeight() * 0.1; 
        this.context.fillStyle = "white";
        this.context.fillRect(x1, y, this.buttonWidth, this.buttonHeight);
      
        this.context.fillStyle = "black";
        this.context.font = this.game.canvas.getHeight()/15+"px times new roman";
        this.context.fillText(
          button.text,
          x1 + (this.buttonWidth - this.context.measureText(button.text).width) /2,
          y + this.buttonHeight / 2 + this.game.canvas.getHeight()/40
        );
        this.context.strokeRect(x1, y, this.buttonWidth, this.buttonHeight);

        this.context.fillStyle = "white";
        this.context.fillRect(x2, y, this.buttonWidth, this.buttonHeight);

        this.context.fillStyle = "black";
        this.context.font = this.game.canvas.getHeight()/15+"px times new roman";
        this.context.fillText(
            this.toMenuButton.text,
            x2 + (this.buttonWidth - this.context.measureText(this.toMenuButton.text).width) /2,
            y + this.buttonHeight / 2 + this.game.canvas.getHeight()/40
          );
        this.context.strokeRect(x2, y, this.buttonWidth, this.buttonHeight);
    }

    addBackground() {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
        this.context.drawImage(this.image, 0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
    }


    addTitle() {
        this.context.fillStyle = "white";
        this.context.font = "48px Arial";
        this.context.fillText(this.title, 10, 50);
    }
    
}
