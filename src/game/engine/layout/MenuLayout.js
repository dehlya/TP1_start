import { Layout } from "./Layout.js";
//import { Detective } from "../../animation/characters/detective/Detective.js";
//import { Enemy } from "../../animation/characters/enemy/Enemy.js";
import { Button } from "../interacter/Button.js";
export class MenuLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey";
        this.title = "Game Menu";
        //this.createDetectiveCharacter();
    }
    createDetectiveCharacter() {
        //let philbert = new Detective("Philbert", 250, 380, this.game);
        //this.addCharacter(philbert);
        console.log(this.game);
    }
    draw() {
        this.addBackground();
        this.addTitle();
        /*let playButton = new Button("../sprites/buttons/play.png",390,450,600,1200,3,this.game);
        playButton.addClickListener(() => {
            this.game.setCurrentState(this.game.creditState);
        })*/
        //let infoButton = new Button("../sprites/buttons/info.png", 920, 15, 200, 200, 3, this.game);
        this.addFlashEffect();
        super.draw();
    }
    addBackground() {
        // let sky = new Image();
        // sky.src = "../sprites/background/space/sky.png";
        // this.game.canvas.getContext().drawImage(sky, 0, 0, 4096, 4096, 0, 0, 1800, 1000);
        // let stars = new Image();
        // stars.src = "../sprites/background/space/stars.png";
        // this.game.canvas.getContext().drawImage(stars, 0, 0);
        // let backBuilding = new Image();
        // backBuilding.src = "../sprites/background/city/back-buildings.png";
        // this.game.canvas.getContext().drawImage(backBuilding, 20, 0, 256, 192, 0, -250, 1000, 800);
        // let foreground = new Image();
        // foreground.src = "../sprites/background/city/foreground.png";
        // this.game.canvas.getContext().drawImage(foreground, 50, 0, 256, 192, 0, -150, 1000, 800);
    }
    addTitle() {
        this.game.canvas.getContext().fillStyle = "white";
        let title = "Philbert";
        let subtitle = "Forbidden Memories";
        this.context.font = "80px Bebas Neue";
        this.game.canvas.getContext().fillText(title, 380, 80);
        this.context.font = "48px Syne Mono";
        this.game.canvas.getContext().fillText(subtitle, 260, 120);
    }
    addFlashEffect() {
        // if (this.game.getFrame() % 15 == 0 || this.game.getFrame() % 25 == 0) {
        //     let random = (Math.floor(Math.random() * 200) + 1);
        //     random += 100;
        //     this.game.canvas.getContext().filter = "brightness(" + random.toString() + "%)";
        // }
        // else {
        //     this.game.canvas.getContext().filter = "brightness(100%)";
        // }
    }
    addRandomEnemy(game) {
        // if (this.game.getFrame() % 30 == 0) {
        //     let enemy = new Enemy("Enemy", 0, 250, game, "right");
        //     this.addCharacter(enemy);
        // }
    }
}
