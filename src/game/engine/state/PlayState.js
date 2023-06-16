import { PlayLayout } from "../layout/PlayLayout.js";
import { State } from "./State.js";
import { Level } from "../../levels/Level.js";
import { LevelsManager } from "../../levels/LevelsManager.js";
import { KeyHandler } from "../handler/KeyHandler.js";
export class PlayState extends State {
    constructor(game) {
        super(game);
        this.difficulty = 1;
        this.layout = new PlayLayout(this.game);
        this.isState = false;
        setInterval(() => {
            if (this.isState) {
                for(let i = 0; i < this.difficulty; i++){
                    this.layout.addEnemy();
                }
            }
        }, 5000);
    }
    toCredit() {
    }
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
    toGameOver(){
        this.game.setCurrentState("GameOver");
    }
}
