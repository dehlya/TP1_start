import { MenuLayout } from "../layout/MenuLayout.js";
import { State } from "./State.js";
export class MenuState extends State {
    constructor(game) {
        super(game);
        this.layout = new MenuLayout(this.game);
        this.layout.hardFrontier = true;
    }
    toCredit() {
        this.game.setCurrentState(this.game.creditState);
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
    
}
