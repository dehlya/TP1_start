export class Layout {
    constructor(game) {
        this.characters = [];
        this.hardFrontier = false;
        this.game = game;
        this.context = game.canvas.getContext();
    }
}
