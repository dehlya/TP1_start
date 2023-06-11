import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";

export class SettingsLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "black";
        this.title = "Settings";
        this.buttonWidth = 100;
        this.buttonHeight = 50;

        this.soundButton = new Button("Sound", () => game.state.toggleSound());
        this.musicButton = new Button("Music", () => game.state.toggleMusic());
        this.backButton = new Button("Back", () => game.state.toMenu());
    }

    draw() {
        this.addBackground();
        this.addTitle();
        this.addButtons();
        super.draw();
    }

    addButtons() {
        const buttonMargin = 10;
        const x = (this.game.canvas.getWidth() - this.buttonWidth) / 2;
        const soundY = this.game.canvas.getHeight() / 2 - this.buttonHeight - buttonMargin;
        const musicY = this.game.canvas.getHeight() / 2 + buttonMargin;
        const backY = this.game.canvas.getHeight() - this.buttonHeight - buttonMargin;
        const geoY = musicY + this.buttonHeight + (backY - (musicY + this.buttonHeight)) / 2;
        
        this.addButton(this.soundButton, x, soundY);
        this.addButton(this.musicButton, x, musicY);
        this.addButton(this.backButton, x, backY);
        this.addGeolocationText(x, geoY);

    }

    addButton(button, x, y) {
        this.context.fillStyle = "#333";
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

    addGeolocationText(x, y) {
    this.context.fillStyle = "white";
    this.context.font = "16px Arial";
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
        this.context.font = "48px Arial";
        this.context.fillText(this.title, 10, 50);
    }
}
