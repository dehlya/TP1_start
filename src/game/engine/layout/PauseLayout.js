import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";

export class PauseLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "../../../ressources/game/background/background_dungeon_final_v2.png";
        this.image = new Image();
        this.image.src = this.background;
        this.title = "PAUSE";
        this.buttonWidth = this.game.canvas.getWidth()/4;
        this.buttonHeight = this.game.canvas.getHeight()/8;

        this.resumeButton = new Button("Resume", () => game.state.resumePlay());
        this.settingsButton = new Button("Settings", () => game.state.toSettings());
        this.menuButton = new Button("Menu", () => game.state.toMenu());
        
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
        const resumeY = this.game.canvas.getHeight() * 0.4 + buttonMargin;
        const settingsY = resumeY - this.buttonHeight - buttonMargin; 
        const menuY = this.game.canvas.getHeight() * 0.8; 

        this.addButton(this.resumeButton, x, settingsY);
        this.addButton(this.settingsButton, x, resumeY);
        this.addButton(this.menuButton, x, menuY);

      }
      
      addButton(button, x, y) {
        this.context.fillStyle = "white";
        this.context.fillRect(x, y, this.buttonWidth, this.buttonHeight);
    
        this.context.fillStyle = "black";
        this.context.font = this.game.canvas.getHeight()/15+"px times new roman";
        this.context.fillText(
            button.text,
            x + (this.buttonWidth - this.context.measureText(button.text).width) / 2,
            y + this.buttonHeight / 2 + this.game.canvas.getHeight()/40
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
        this.context.font = this.game.canvas.getHeight()/10+"px times new roman";
        this.context.fillText(this.title, this.game.canvas.getWidth()/2.45, 50);
    }
}
    