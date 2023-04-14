import { GameOverLayout } from "../layout/GameOverLayout.js";
import { State } from "./State.js";
export class GameOverState extends State {
    constructor(game) {
        super(game);
        this.layout = new GameOverLayout(this.game);
    }
    toCredit() {
    }
    toGameOver() {
    }
    toMenu() {
    }
    toPlay() {
        //this.game.setCurrentState(this.game.playState);
    }
    toPause() {
    }
    render(){
        this.layout.draw();
    }
}
