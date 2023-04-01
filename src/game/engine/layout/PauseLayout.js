import { Layout } from "./Layout.js";
export class PauseLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey";
        this.title = "Play in pause...";
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
