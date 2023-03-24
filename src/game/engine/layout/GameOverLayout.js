import { Layout } from "./Layout.js";
export class GameOverLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey";
        this.title = "Game Over";
    }
}
