import { Layout } from "./Layout.js";
export class GameOverLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey";
        this.title = "Game Over";
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
