import {EnemyState} from "./EnemyState.js";
import {EnemyMoveState} from "./EnemyMoveState.js";

export class EnemyHitState extends EnemyState{
    constructor(enemy){
        super(enemy);
    }
    hitOver() {
        console.log("Enemy hit animation over");
        this.enemy.setState(new EnemyMoveState(this.enemy));
    }
    move(){
        this.enemy.setState(new EnemyMoveState(this.enemy));
    }
}