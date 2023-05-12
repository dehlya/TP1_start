import { GameOverLayout } from "../layout/GameOverLayout.js";
import { State } from "./State.js";
import { KeyHandler } from "../handler/KeyHandler.js";
export class GameOverState extends State {
    constructor(game) {
        super(game);
        this.layout = new GameOverLayout(this.game);
        this.keyHandler = new KeyHandler();
    }
    toCredit() {
    }
    toMenu() {
    }
    tryAgain(){
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
