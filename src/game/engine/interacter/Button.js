export class Button {
    constructor(src, x, y, originalImageWidth, originalImageHeight, factor, game) {
        this.game = game;
        let play = new Image();
        play.src = src;
        this.width = originalImageWidth / factor;
        this.x = x;
        this.y = y;
        this.height = originalImageHeight / factor;
        game.canvas.getContext().drawImage(play, 0, 0, originalImageWidth, originalImageHeight, x, y, this.width, this.height);
    }
    addClickListener(fn) {
        window.addEventListener('click', (event) => {
            fn();
        });
    }
    moveState(state) {
        this.game.setCurrentState(this.game.creditState);
    }
}
