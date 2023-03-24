import { State } from "./State.js";
import { CreditLayout } from "../layout/CreditLayout.js";
export class CreditState extends State {
    constructor(game) {
        super(game);
        this.layout = new CreditLayout(game);
    }
    toCredit() {
    }
    toGameOver() {
    }
    toMenu() {
        this.game.setCurrentState(this.game.menuState);
    }
    toPlay() {
    }
    toPause() {
    }
}
