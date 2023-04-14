import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";
export class EndGameLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey";
        this.title = "Game finished";
    }

    draw() {
        this.addBackground();
        this.addTitle();
        super.draw();
    }
    addBackground() {
        this.game.context.fillStyle = this.background;
        this.game.context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    }
    addTitle() {
    }
    
}