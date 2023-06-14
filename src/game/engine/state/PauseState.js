import { State } from "./State.js";
import { PauseLayout } from "../layout/PauseLayout.js";
import { KeyHandler } from "../handler/KeyHandler.js";
export class PauseState extends State {
    constructor(game) {
        super(game, "Pause");
        this.layout = new PauseLayout(this.game);
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
        let settingsY = resumeY - this.layout.buttonHeight - buttonMargin;
        const menuY = this.game.canvas.getHeight() * 0.9;
    
        if (x >= startX && x <= startX + this.layout.buttonWidth && y >= settingsY && y <= settingsY + this.layout.buttonHeight) {
          this.layout.resumeButton.onClick();
        } else if (x >= startX && x <= startX + this.layout.buttonWidth && y >= resumeY && y <= resumeY + this.layout.buttonHeight) {
          this.layout.settingsButton.onClick();
        } else if (x >= startX && x <= startX + this.layout.buttonWidth && y >= menuY && y <= menuY + this.layout.buttonHeight) {
          this.layout.menuButton.onClick();
        }
      }
    
    toMenu() {
        this.game.setCurrentState("Menu");
    }

    toSettings() {
        this.game.setCurrentState("Settings");
    }
    
    resumePlay() {
        this.game.setCurrentState("Play");
    }

    render() {
        this.layout.draw();
      }

    enter() {
        super.enter();
        this.handleClickBound = this.handleClick.bind(this);
        this.game.canvas.canvas.addEventListener('click', this.handleClickBound);
      }
      
      exit() {
        super.exit();
        this.game.canvas.canvas.removeEventListener('click', this.handleClickBound);
      }
      

    addCallbacks() {
    }

}
