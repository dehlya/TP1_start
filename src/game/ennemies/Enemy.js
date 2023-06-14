import {EnemyState} from "./EnemyState.js";
import {EnemyMoveState} from "./EnemyMoveState.js";

export class Enemy {
    constructor(rank, x , y, canvas, ctx, parent){
        if(this.rank == 1){
            this.rank = 1;
            this.hp = 100;
            this.attack = 10;
            this.faith = 25;
            this.folder = "enemy1";
        }
        if(this.rank == 2){
            this.rank = 2;
            this.hp = 100;
            this.attack = 20;
            this.faith = 50;
            this.folder = "enemy2";
        }
        if(this.rank == 3){
            this.rank = 3;
            this.hp = 200;
            this.attack = 30;
            this.faith = 75;
            this.folder = "enemy3";
        }
        if(this.rank == 4){
            this.rank = 4;
            this.hp = 5000;
            this.attack = 25;
            this.faith = 1500;
            this.folder = "enemy4";
        }
        this.state = new EnemyMoveState(this);
        this.currentIMage = `../../../ressources/game/enemies/${this.folder}/${this.folder}_moving_right_${this.rank}.png`;
        this.parent = parent; // retrieve the parent of enemy
        this.x = x; // retrieve the x position of the enemy
        this.y = y; // retrieve the y position of the enemy
        this.character = parent.character; // retrieve the character of the enemy
        this.canvas = canvas; // retrieve the canvas of the enemy
        this.ctx = ctx; // retrieve the context of the enemy
        this.width = 70; // With of the enemy
        this.height = 100; // Height of the enemy
    }

    drawEnemy(){
        this.ctx.drawImage(this.currentIMage, this.x, this.y);
    }

    // getters and setters
    setState(state){
        this.state = state;
    }
    getHealth(){
        return this.hp;
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
    }
    startMoveAnimation(direction){
    }

    //hit methods
    hit(){
        this.state.hit();
    }
    hitAnimation(){}
}