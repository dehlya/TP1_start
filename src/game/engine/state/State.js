class Handler {
}
export class State {
    constructor(game) {
        this.handlers = new Array();
        this.bullets = new Array();
        this.hardFrontier = false;
        this.game = game;
    }
    init() {
        this.game.canvas.cleanCanvas(this);
    }
}
