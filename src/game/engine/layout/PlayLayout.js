import { Layout } from "./Layout.js";
export class PlayLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey";
        this.title = "Play in progress...";
    }
}
