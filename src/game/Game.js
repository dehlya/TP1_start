import { GameOverState } from "./engine/state/GameOverState.js";
import { PlayState } from "./engine/state/PlayState.js";
import { MenuState } from "./engine/state/MenuState.js";
import { CreditState } from "./engine/state/CreditState.js";
import { PauseState } from "./engine/state/PauseState.js";
import { LogoState } from "./engine/state/LogoState.js";
import { Player } from "./engine/player/Player.js";
export class Game {
    constructor(canvas, height, width) 
    {
        this.previousTime = 0;
        this.currentTime = 0;
        this.passedTime = 0;
        this.msPerFrame = 1000335.0 / 144.0;

        this.character = 0;
        this.gameMode = 0;
        this.scenes = [];
        this.lastScene = 0;
        this.scene = 0;
        this.level = 0;
        this.levelMax = 0;

        this.canvas  = canvas;
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);

        this.settings;
        this.player;
        this.state;
    }

    start()
    {
        this.init();
        this.run();
    }

    init()
    {   

        this.previousTime = new Date().getTime();
        this.canvas.setBackground("white");

        this.player = new Player();

        let menuState = new MenuState(this);
        let playState = new PlayState(this);
        let pauseState = new PauseState(this);
        let gameOverState = new GameOverState(this);
        let creditState = new CreditState(this);
        let logoState = new LogoState(this);
        this.setCurrentState(logoState);
        

    }

    run(time)
    {
        let currentTime = new Date().getTime();
        this.passedTime += currentTime - this.previousTime;
        this.previousTime = currentTime;

        while (this.passedTime >= this.msPerFrame)
        {
            console.log("loop");
            this.render();
            this.passedTime -= this.msPerFrame;
        }

        // ============================================
        // RUNTIME MUST BE UNCOMMENTED TO RUN THE GAME
        // ============================================

        requestAnimationFrame(this.run.bind(this));
    }
    setCurrentState(State){
        this.state = State;
        this.state.init();
        this.render();
    }
    render(){
        this.canvas.cleanCanvas(this.state);
        console.log("clean")
        this.state.render();
        console.log("render")
    }

}