import {EnemyState} from "./EnemyState.js";
import {EnemyMoveState} from "./EnemyMoveState.js";

export class Enemy {
    constructor(rank, x , y, canvas, ctx, parent){
        if(rank == 1){
            this.rank = 1;
            this.hp = 200;
            this.attack = 10;
            this.faith = 100;
            this.folder = "enemy1";
        }
        if(rank == 2){
            this.rank = 2;
            this.hp = 300;
            this.attack = 20;
            this.faith = 200;
            this.folder = "enemy2";
        }
        if(rank == 3){
            this.rank = 3;
            this.hp = 400;
            this.attack = 30;
            this.faith = 400;
            this.folder = "enemy3";
        }
        if(rank == 4){
            this.rank = 4;
            this.hp = 5000;
            this.attack = 25;
            this.faith = 1500;
            this.folder = "enemy4";
        }
        this.direction = "right"; // Direction of the enemy
        this.state = new EnemyMoveState(this);

        //Setting the image of the ennemy to draw
        this.currentFrame = 0;
        this.currentImage = `../../../ressources/game/enemies/${this.folder}/${this.folder}_moving_${this.direction}_${this.currentFrame}.png`;
        this.image = new Image();
        this.image.src = this.currentImage;


        this.parent = parent; // retrieve the parent of enemy
        this.x = x; // retrieve the x position of the enemy
        this.y = y; // retrieve the y position of the enemy
        this.character = parent.character; // retrieve the character of the enemy
        this.canvas = canvas; // retrieve the canvas of the enemy
        this.ctx = ctx; // retrieve the context of the enemy
        this.width = 70; // With of the enemy
        this.height = 100; // Height of the enemy
        this.startMoveAnimation();

        setInterval( () => {
            if(this.currentFrame < 7){
                this.currentFrame += 1;
            }
            else{
                this.currentFrame = 0;
            }
            this.currentImage = `../../../ressources/game/enemies/${this.folder}/${this.folder}_moving_${this.direction}_${this.currentFrame}.png`;
            this.image.src = this.currentImage;
        },100)
        this.centerX = this.image.width/2;
        this.centerY = this.image.height/2;
    }

    drawEnemy(){
        this.ctx.drawImage(this.image, this.x, this.y);
        this.move();
    }

    // getters and setters
    setState(state){
        this.state = state;
    }
    getHealth(){
        return this.hp;
    }
    getX(){
        return this.x;
    }
    setX(value){
        return this.x = value;
    }
    setY(value){
        return this.y = value;
    }
    getY(){
        return this.y;
    }
    getAttackPower(){
        return this.attack;
    }
    getFaith(){
        return this.faith;
    }

    //different methods
    looseHP(value){
        this.hp -= value;
    }

    //attack methods
    attack(){
        this.state.attack(this.attack);
    }
    startAttackAnimation(){

    }
    attackOver(){
        this.state.attackOver();
    }

    //move methods
    move(){
        this.state.move();
        if(this.x > this.character.x){
            this.x -= 1;
            this.direction = "left";
        }
        else if(this.x < this.character.x){
            this.x += 1;
            this.direction = "right";
        }
        if(this.y > this.character.y){
            this.y -= 1;
        }
        else if(this.y < this.character.y){
            this.y += 1;
        }

    }

    startMoveAnimation(direction){

    }

    //hit methods
    hit(value){
        this.state.hit(value);
    }
    hitAnimation(){}

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}