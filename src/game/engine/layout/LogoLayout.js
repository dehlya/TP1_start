import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";
export class LogoLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey";
        this.title = "Welcome";
    }

    draw() {
        this.addBackground();
        this.addTitle();
        super.draw();
    }
    addBackground() {
        
    }
    addTitle() {
    }
}