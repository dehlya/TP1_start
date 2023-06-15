import { PlayLayout } from "../layout/PlayLayout.js";
import { State } from "./State.js";
import { Level } from "../../levels/Level.js";
import { LevelsManager } from "../../levels/LevelsManager.js";
import { KeyHandler } from "../handler/KeyHandler.js";
export class PlayState extends State {
    constructor(game) {
        super(game);
        this.difficulty = 10000;
        this.layout = new PlayLayout(this.game);
        this.isState = false;
        setInterval(() => {
            if (this.isState) {
               this.layout.addEnemy(); 
            }
        }, this.difficulty);
    }
    toCredit() {
    }à
    setLayout() {
        this.layout = new PlayLayout(this.game);
    }
    toGameOver() {
        this.game.setCurrentState("GameOver");
    }
    toMenu() {
        this.game.setCurrentState("Menu");
    }
    toPlay() {
        this.game.start();
    }
    toPause() {
        this.game.setCurrentState("Pause");
    }
    render(){
        this.layout.redraw();
    }
    nextLevel(){
        this.levelsManager.nextLevel();
    }
    previousLevel(){
        this.levelsManager.previousLevel();
    }
    goToLevel(number){
        this.levelsManager.goToLevel(number);
    }
    getLevelDescription(number){

    }
    enter() {
        super.enter();
        this.game.start();
        this.game.canvas.canvas.addEventListener('click', this.handleClickBound);
        this.addCallbacks();
        this.isState = true;
    }
  
    exit() {
        super.exit();
        //this.keyHandler.removeAllCallbacks();
        this.isState = false;
    }
    addCallbacks() {
    }
}
