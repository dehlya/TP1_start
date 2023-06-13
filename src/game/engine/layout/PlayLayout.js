import { Layout } from "./Layout.js";
import { Character } from "../../character/Character.js";

export class PlayLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey"
        this.title = "Play in progress...";
        this.showUsernameInput = false; // Flag to control the display of the username input window
        this.character = new Character(
            this.game.canvas.getWidth() / 2,
            this.game.canvas.getHeight() / 2,
            this.game.canvas.getCanvas(),
            this.game.canvas.getContext(),
            this
        );

        this.img = new Image();
        this.img.src = "../../../ressources/game/background/background_dungeon_final_v2.png";
    }

    /**
     * Initial draw
     */
    draw() {

        this.addBackground();
        this.addCharacter();
        this.addTitle();
        super.draw();
    }

    /**
     * Redraw the title and the background (used when the character moves)
     */
    redraw() {
        this.addBackground();
        this.addTitle();
    }

    addBackground() {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
        this.context.drawImage(this.img, 0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
    }


    addCharacter() {
        const character = this.character;

        const img = new Image();
        img.src = character.currentImage;
        img.onload = () => {
            character.render();
        };
    }
    addTitle() {
        const character = this.character;

        // Set font properties
        this.context.font = '20px Arial';
        this.context.fillStyle = 'white';

        // Draw health indicator
        const healthIndicator = `Health: ${this.character.hp/this.character.hpMax*100}%`;
        this.context.fillText(healthIndicator, this.game.canvas.getWidth()-150, 30);

        // Draw stamina indicator
        const staminaIndicator = `Stamina: ${this.character.stamina/this.character.staminaMax*100}%`;
        this.context.fillText(staminaIndicator,this.game.canvas.getWidth()-150, 60);
    }
}
