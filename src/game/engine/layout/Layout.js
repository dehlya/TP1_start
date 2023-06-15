export class Layout {
    constructor(game) {
        console.log("here layout class!!!!");
        this.hardFrontier = false;
        this.game = game;
        this.context = game.canvas.getContext();
    }
    draw() {
    }
}
