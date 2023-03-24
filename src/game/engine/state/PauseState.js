import { State } from "./State.js";
import { PauseLayout } from "../layout/PauseLayout.js";
export class PauseState extends State {
    constructor(game) {
        super(game);
        this.layout = new PauseLayout(this.game);
    }
    toCredit() {
    }
    toGameOver() {
    }
    toMenu() {
        this.game.setCurrentState(this.game.menuState);
    }
    toPlay() {
        this.game.setCurrentState(this.game.playState);
    }
    toPause() {
    }
}
