import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";
export class CreditLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey";
        this.title = "Credit";
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
