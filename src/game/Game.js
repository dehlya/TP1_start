import { GameOverState } from "./engine/state/GameOverState.js";
import { PlayState } from "./engine/state/PlayState.js";
import { MenuState } from "./engine/state/MenuState.js";
import { CreditState } from "./engine/state/CreditState.js";
import { PauseState } from "./engine/state/PauseState.js";
import { Gravity } from "./engine/physics/Gravity.js";
export class Game {
    constructor(canvas, height, width) {
        this.counter = 1;
        this.bufferFrame = 15;
        this.frame = 1;
        this.FPS = 30;
        this.lastTimestamp = 0;
        this.canvas = canvas;
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);
        this.canvas.getContext().imageSmoothingEnabled = false;
        // this.gameOverState = new GameOverState(this);
        // //this.playState = new PlayState(this);
        // this.menuState = new MenuState(this);
        // //this.creditState = new CreditState(this);
        // //this.pauseState = new PauseState(this);
        // this.setCurrentState(this.menuState);
        // //this.gravity = new Gravity(this);
        this.draw();
    }
    setCurrentState(state) {
        this.currentState = state;
        this.currentState.init();
    }
    draw() {
        //this.currentState.layout.draw();
        this.manageFrame();
        //this.manageParticules();
        //this.getGravity().manageGravity();
        window.requestAnimationFrame(() => {
            this.draw();
        });
    }
    getFrame() {
        return this.frame;
    }
    manageFrame() {
        this.counter += 1;
        if (this.counter % this.bufferFrame == 0) {
            this.frame += 1;
        }
    }
    getGravity() {
        return this.gravity;
    }
    addGravity() {
        this.gravity = new Gravity(this);
    }
    manageParticules() {
        this.currentState.bullets.forEach((particule) => {
            if (particule.x < 0 || particule.x > this.canvas.getWidth()) {
                this.currentState.bullets.splice(this.currentState.bullets.indexOf(particule));
                console.log(particule);
            }
        });
    }
}