import { Layout } from "./Layout.js";
//import { Detective } from "../../animation/characters/detective/Detective.js";
//import { Enemy } from "../../animation/characters/enemy/Enemy.js";
import { Button } from "../interacter/Button.js";
export class MenuLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey";
        this.title = "Game Menu";
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
