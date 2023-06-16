import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";

export class GameOverLayout extends Layout {
    constructor(game) {
        super(game);
        console.log("i entered the game over layout ! ");
        console.log("i'm setting the background");
        this.background = "../../../ressources/game/background/background_you_died.png";
        this.image = new Image();
        this.image.src = this.background;
        this.title = "Game Over";

        this.buttonWidth = 100;
        this.buttonHeight = 50;

        this.playAgainButton = new Button("Retry ?", () => game.state.playAgain());
        
    }
    draw() {
        this.addBackground();
        this.addTitle();
        this.addButtons();
        //this.addButton();
        super.draw();
    }
    addButtons() {
        const x = this.game.canvas.getWidth() * 0.5 - this.buttonWidth / 2;
        const buttonMargin = this.game.canvas.getHeight() * 0.1; 
        const playAgainY = this.game.canvas.getHeight() * 0.5 + buttonMargin;

        this.addButton(this.playAgainButton, x, playAgainY);

      }
      
    addButton(button, x, y) {
        this.context.fillStyle = "grey";
        this.context.fillRect(x, y, this.buttonWidth, this.buttonHeight);
    
        this.context.fillStyle = "white";
        this.context.font = "24px Arial";
        this.context.fillText(
            button.text,
            x + (this.buttonWidth - this.context.measureText(button.text).width) / 2,
            y + this.buttonHeight / 2 + 8
        );
        this.context.strokeRect(x, y, this.buttonWidth, this.buttonHeight);
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
