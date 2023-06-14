import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";
export class LogoLayout extends Layout {

    constructor(game) {
        super(game);
        this.background = "#6c6b94";
        this.title = "The Invoked One";
    }

    draw() {
        this.addBackground();
        this.addTitle();
        super.draw();
    }

    addBackground() {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    }

    addTitle() {
        const canvasWidth = this.game.canvas.getWidth();
        const canvasHeight = this.game.canvas.getHeight();
        const titleFont = this.game.canvas.getHeight()/5+"px 'Segoe Script', cursive";
        this.context.font = titleFont;
        const titleWidth = this.context.measureText(this.title).width;
        const titleX = (canvasWidth - titleWidth) / 2;
        const titleY = (canvasHeight / 2);
      
        this.context.fillStyle = "white";
        this.context.font = titleFont;
        this.context.fillText(this.title, titleX, titleY);      
    }

}