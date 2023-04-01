class Handler {
}
export class State {
    constructor(game) {
        this.game = game;
    }
    init() {
        this.game.canvas.cleanCanvas(this);
    }
}
