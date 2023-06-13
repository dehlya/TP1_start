class Handler {
}
export class State {
    constructor(game, name) {
        this.game = game;
        this.name = name;
        this.audio = new Audio(
            "../../../ressources/site/video/forest-lullaby-110624.mp3"
        );
        //temp for one basic music
    }
    init() {
        this.game.canvas.cleanCanvas(this);
    }

    enter(){
        //this.audio.play();
    }
    exit(){
        this.audio.pause();
    }
    
    }
