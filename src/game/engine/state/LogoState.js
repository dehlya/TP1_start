import { LogoLayout } from "../layout/MenuLayout.js";
import { State } from "./State.js";
export class LogoLayout extends State {
    constructor(game) {
        super(game);
        this.layout = new LogoLayout(this.game);
        this.layout.hardFrontier = true;
    }
    toCredit() {
        this.game.setCurrentState(this.game.creditState);
    }
    toMenu() {
    }
}
