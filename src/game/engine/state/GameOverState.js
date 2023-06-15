import { GameOverLayout } from "../layout/GameOverLayout.js";
import { State } from "./State.js";
import { KeyHandler } from "../handler/KeyHandler.js";

export class GameOverState extends State {
    constructor(game) {
        super(game);
        this.layout = new GameOverLayout(this.game);
        this.keyHandler = new KeyHandler();
    }

    handleClick(event) {
        if (this.game.state !== this) return;
      
        let rect = this.game.canvas.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
      
        let startX = this.game.canvas.getWidth() * 0.5 - this.layout.buttonWidth / 2;
        const buttonMargin = this.game.canvas.getHeight() * 0.1;
        let resumeY = this.game.canvas.getHeight() * 0.5 + buttonMargin;
    
        if (x >= startX && x <= startX + this.layout.buttonWidth && y >= settingsY && y <= settingsY + this.layout.buttonHeight) {
          this.layout.playAgainButton.onClick();
        } 
    }

    tryAgain(){
        this.game.setCurrentState("Play");
        this.game.fullscreen();
    }

    render(){
        this.layout.draw();
    }
    enter() {
        super.enter();
        this.addCallbacks();
        this.game.canvas.canvas.addEventListener('click', this.handleClickBound);
    }
  
    exit() {
        super.exit();
        this.game.canvas.canvas.removeEventListener('click', this.handleClickBound);

    }
    addCallbacks() {        
        this.game.canvas.canvas.addEventListener('click', (event) => this.handleClick(event));
    }

}
