import { EndGamelayout } from "../layout/GameOverLayout.js";
import { State } from "./State.js";
export class EndGameState extends State {
    constructor(game) {
        super(game);
        this.layout = new EndGameState(this.game);
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
    }
    
}