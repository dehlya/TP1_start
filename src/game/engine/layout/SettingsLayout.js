import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";

export class SettingsLayout extends Layout {
    
    constructor(game) {
        super(game);
        this.game = game;
        this.background = "black";
        this.title = "SETTINGS";
        this.buttonWidth = 100;
        this.buttonHeight = 50;

        this.soundButton = new Button("SOUND", () => game.state.toggleSound());
        this.musicButton = new Button("MUSIC", () => game.state.toggleMusic());
        this.backButton = new Button("BACK", () => game.state.toMenu());
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
        const musicY = this.game.canvas.getHeight() * 0.4 + buttonMargin;
        const soundY = musicY - this.buttonHeight - buttonMargin; 
        const backY = this.game.canvas.getHeight() * 0.8; 
        const geoY = musicY + this.buttonHeight + (backY - (musicY + this.buttonHeight)) / 2;

        this.addButton(this.soundButton, x, soundY);
        this.addButton(this.musicButton, x, musicY);
        this.addButton(this.backButton, x, backY);
        this.addGeolocationText(x, geoY);        

      }
      
      
      addButton(button, x, y, key) {
        this.context.fillStyle = "white";
        this.context.fillRect(x, y, this.buttonWidth, this.buttonHeight);
    
        this.context.fillStyle = "black";
        this.context.font = "24px Times New Roman";
        this.context.fillText(
            button.text,
            x + (this.buttonWidth - this.context.measureText(button.text).width) / 2,
            y + this.buttonHeight / 2 + this.game.canvas.getHeight()/60
        );
        this.context.strokeRect(x, y, this.buttonWidth, this.buttonHeight);

        }
        

    addGeolocationText(x, y) {
        this.context.fillStyle = "white";
        this.context.font = "16px Times new roman";
        const textWidth = this.context.measureText(this.game.state.geolocationText).width;
        const centeredX = x + (this.buttonWidth - textWidth) / 2;
        this.context.fillText(
            this.game.state.geolocationText,
            centeredX,
            y
    );
    }

    addBackground() {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
    }

    addTitle() {
        this.context.fillStyle = "white";
        this.context.font = "48px Times new roman";
        this.context.fillText(this.title, 10, 50);
    }
}
