import { EndGamelayout } from "../layout/GameOverLayout.js";
import { State } from "./State.js";
import { KeyHandler } from "../handler/KeyHandler.js";
export class EndGameState extends State {
    constructor(game) {
        super(game);
        this.layout = new EndGameState(this.game);
        this.keyHandler = new KeyHandler();
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