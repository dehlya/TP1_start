import { GameOverLayout } from "../layout/GameOverLayout.js";
import { EndGameLayout } from "../layout/EndGameLayout.js";
import { State } from "./State.js";
import { KeyHandler } from "../handler/KeyHandler.js";

export class GameOverState extends State {
    constructor(game) {
        super(game);
        this.layout = new GameOverLayout(game);
        this.keyHandler = new KeyHandler();
    }

    handleClick(event) {
        if (this.game.state !== this) return;
      
        let rect = this.game.canvas.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
      
        let buttonX1 = this.game.canvas.getWidth() * 0.25 - this.layout.buttonWidth/2 ;
        const buttonMargin = this.game.canvas.getHeight() * 0.1;
        let buttonY = this.game.canvas.getHeight() * 0.1;
    
        if (x >= buttonX1 && x <= buttonX1 + this.layout.buttonWidth && y >= buttonY && y <= buttonY + this.layout.buttonHeight) {
          this.layout.playAgainButton.onClick();
        } 

        let buttonX2 = this.game.canvas.getWidth() * 0.75 - this.layout.buttonWidth/2 ;
    
        if (x >= buttonX2 && x <= buttonX2 + this.layout.buttonWidth && y >= buttonY && y <= buttonY + this.layout.buttonHeight) {
          this.layout.toMenuButton.onClick();
        } 
    }

    tryAgain(){
        this.game.resetPlayState();
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
    playAgain(){
        this.game.resetPlayState();
    }
    toMenu(){
        this.game.resetPlayStateMenu();
    }

}
