import { PlayLayout } from "../layout/PlayLayout.js";
import { State } from "./State.js";
import { Level } from "../../levels/Level.js";
import { LevelsManager } from "../../levels/LevelsManager.js";
import { KeyHandler } from "../handler/KeyHandler.js";
export class PlayState extends State {
    constructor(game) {
        super(game);
        this.layout = new PlayLayout(this.game);
        this.levelsManager = new LevelsManager(new Level(this.game, "Level 1", "getLevelDescription(1)"));
        game.canvas.canvas.addEventListener("click", (event) =>
        this.handleClick(event)
      );
      this.keyHandler = new KeyHandler();
    }
    handleClick(event) {
        if (this.game.state !== this) return;
        let rect = this.game.canvas.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
    
        let startX = (this.game.canvas.getWidth() - this.layout.buttonWidth) / 2;
        let startY = this.game.canvas.getHeight() - this.layout.buttonHeight - 10;
    
        if (
          x >= startX &&
          x <= startX + this.layout.buttonWidth &&
          y >= startY &&
          y <= startY + this.layout.buttonHeight
        ) {
          this.layout.backButton.onClick();
        }
      }
    toPause() {
        this.game.setCurrentState("Pause");
    }
    render(){
        this.layout.draw();
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
        this.addCallbacks();
    }
    exit() {
        super.exit();
        this.keyHandler.removeAllCallbacks();
    }
    addCallbacks() {
        this.game.canvas.addClickListener(() => {
            this.layout.showUsernameInput = true; // Set the flag to display the username input window
            this.game.render(); // Render the updated layout
        });
    }
}
