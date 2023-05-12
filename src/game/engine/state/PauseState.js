import { State } from "./State.js";
import { PauseLayout } from "../layout/PauseLayout.js";
import { KeyHandler } from "../handler/KeyHandler.js";
export class PauseState extends State {
    constructor(game) {
        super(game);
        this.layout = new PauseLayout(this.game);
        this.keyHandler = new KeyHandler();
    }
    toCredit() {
        this.game.setCurrentState("Credits");
    }
    
    toMenu() {
        this.game.setCurrentState("Menu");
    }
    toPlay() {
        this.game.setCurrentState("Play");
    }
    toPause() {
    }
    render(){
        this.layout.draw();
    }
    enter() {
        super.enter();
        this.addCallbacks();
    }
  
    exit() {
        super.exit();
        this.keyHandler.removeAllCallbacks();
    }
    addCallbacks() {
    }
}
