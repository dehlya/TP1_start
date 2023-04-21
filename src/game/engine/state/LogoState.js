import { LogoLayout } from "../layout/logoLayout.js";
import { State } from "./State.js";
export class LogoState extends State {
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
    render(){
        this.layout.draw();
    }
    
}
