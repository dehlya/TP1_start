export class Layout {
    constructor(game) {
        this.characters = [];
        this.hardFrontier = false;
        this.game = game;
        this.context = game.canvas.getContext();
    }
    draw() {
        this.characters.forEach((character) => {
            character.drawAnimation(this.game);
            character.handleInput();
        });
    }
    addCharacter(character) {
        this.characters.push(character);
        console.log(this.game);
    }
}
