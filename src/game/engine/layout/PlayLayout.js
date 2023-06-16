import { Layout } from "./Layout.js";
import { Character } from "../../character/Character.js";
import {Enemy} from "../../enemies/Enemy.js";
import {MenuLayout} from "./MenuLayout.js";
import {Button} from "../interacter/Button.js";

export class PlayLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey"
        this.difficulty = 1;
        this.raiseDifficulty = 1000;
        this.title = "Play in progress...";
        this.scoreMilestones = 1000;
        this.character = new Character(
            this.game.canvas.getWidth() / 2,
            this.game.canvas.getHeight() / 2,
            this.game.canvas.getCanvas(),
            this.game.canvas.getContext(),
            this
        );
        this.isGameOver = false;

        /**
         * Ennemies spawning
         */
        this.enemies = []; // Array to store the enemies

        this.img = new Image();
        this.img.src = "../../../ressources/game/background/background_dungeon_final_v2.png";

        setInterval( () => {
            if(this.character.faith > this.scoreMilestones){
                this.character.potions += 1;
                this.scoreMilestones += 1000;
            }
            if(this.raiseDifficulty < this.character.faith){
                this.raiseDifficulty += 1000;
                if(this.difficulty < 3){
                    this.difficulty += 1;
                }
                else{
                    this.game.state.setDifficulty(1);
                }
            }
            if(this.character.getHealth() <= 0){
                this.isGameOver = true;

            }
        },)
    }

    /**
     * Initial draw
     */
    draw() {
        this.addBackground();
        this.addCharacter();
        this.addTitle();
        super.draw();
    }

    getEnemies() {
        return this.enemies;
    }

    /**
     * Redraw the title and the background (used when the character moves)
     */
    redraw() {
        this.addBackground();
        this.character.drawCharacter();
        this.enemies.forEach(enemy => {
            enemy.drawEnemy();
        });
        this.addTitle();
        if(this.isGameOver){
            this.addGameOver();
            // Get the current score
            let score = this.character.getFaith();

            // Get the current high score from local storage
            let highScore = parseInt(localStorage.getItem('Highscore'));
            console.log("Your score : " + score); 
            console.log("Your Highscore : " + highScore); 

            // If there's no high score or the current score is greater than the high score, then store the current score
            if(isNaN(highScore) || score > highScore) {
                console.log("highscore updated");
                localStorage.setItem('Highscore', score);
            }
        }
    }

    addBackground() {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
        this.context.drawImage(this.img, 0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
    }


    addCharacter() {
        const character = this.character;

        const img = new Image();
        img.src = character.currentImage;
        img.onload = () => {
            character.drawCharacter();
        };
    }
    addGameOver() {
        this.gameOverBackGround = "../../../ressources/game/background/background_you_died.png";
        this.gameOverImage = new Image();
        this.gameOverImage.src = this.gameOverBackGround;

        this.context.fillStyle = this.gameOverImage;
        this.context.fillRect(0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
        this.context.drawImage(this.gameOverImage, 0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());

        // Set font properties
        this.context.font = '30px Times New Roman';
        this.context.fillStyle = 'white';

        // Draw health indicator
        const flemmeIndicator = `REFRESH THE PAGE TO RESTART THE GAME`;
        this.context.fillText(flemmeIndicator, this.game.canvas.getWidth()/2 -300, 100);
    }
    addEnemy() {
        //initialise random spawn position
        const x = Math.random() < 0.5 ? Math.floor(Math.random() * 101) + 100
            : Math.floor(Math.random() * 101) + (this.game.canvas.getWidth()-200);
        const y = Math.random() < 0.5 ? Math.floor(Math.random() * 101) + 100
            : Math.floor(Math.random() * 101) + (this.game.canvas.getHeight()-200);
        const enemy = new Enemy(
            Math.floor(Math.random() * this.difficulty) + 1,
            x,
            y,
            this.game.canvas.getCanvas(),
            this.game.canvas.getContext(),
            this
        );

        const img = new Image();
        img.src = enemy.currentImage;

        this.enemies.push(enemy);
    }
    addTitle() {
        const character = this.character;

        // Set font properties
        this.context.font = '20px Arial';
        this.context.fillStyle = 'white';

        // Draw health indicator
        const healthIndicator = `Health: ${this.character.hp/this.character.hpMax*100}%`;
        this.context.fillText(healthIndicator, this.game.canvas.getWidth()-150, 30);

        // Draw stamina indicator
        const staminaIndicator = `Stamina: ${this.character.stamina/this.character.staminaMax*100}%`;
        this.context.fillText(staminaIndicator,this.game.canvas.getWidth()-150, 60);

        const faithIndicator = `Faith: ${this.character.faith}`;
        this.context.fillText(faithIndicator, 50, 30);

        const potionIndicator = `Potions: ${this.character.potions}`;
        this.context.fillText(potionIndicator, 50, 60);

        if(localStorage.getItem('Highscore')!== null){
            const highscoreIndicator = `Highscore: ${localStorage.getItem('Highscore')}`;
            this.context.fillText(highscoreIndicator, this.game.canvas.getWidth()/2-50, 60);
        }
        else{
            const highscoreIndicator = `Highscore: -`;
            this.context.fillText(highscoreIndicator, this.game.canvas.getWidth()/2-50, 60);
        }

    }

}
