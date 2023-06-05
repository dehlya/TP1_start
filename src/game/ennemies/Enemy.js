export class Enemy {
    constructor(rank){
        if(this.rank == 1){
            this.rank = 1;
            this.hp = 100;
            this.attack = 10;
            this.faith = 25;
        }
        if(this.rank == 2){
            this.rank = 2;
            this.hp = 100;
            this.attack = 20;
            this.faith = 50;
        }
        if(this.rank == 3){
            this.rank = 3;
            this.hp = 200;
            this.attack = 30;
            this.faith = 75;
        }
        if(this.rank == 4){
            this.rank = 4;
            this.hp = 5000;
            this.attack = 25;
            this.faith = 1500;
        }
        this.state = new EnemyIdleState();
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
    StartAttackAnimation(){

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