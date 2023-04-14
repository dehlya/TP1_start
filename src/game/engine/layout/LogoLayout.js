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
        //super.draw();
    }
    addBackground() {
       
    }
    addTitle() {
    }
    addButton(){

    }
}