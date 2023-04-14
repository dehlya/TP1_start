import { PlayLayout } from "../layout/PlayLayout.js";
import { State } from "./State.js";
export class PlayState extends State {
    constructor(game) {
        super(game);
        this.layout = new PlayLayout(this.game);
    }
    toCredit() {
    }
    toGameOver() {
    }
    toMenu() {
    }
    toPlay() {
    }
    toPause() {
        //this.game.setCurrentState(this.game.pauseState);
    }
    render(){
        this.layout.draw();
    }
}
