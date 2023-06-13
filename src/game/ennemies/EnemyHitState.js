import {EnemyState} from "./EnemyState.js";
import {EnemyIdleState} from "./EnemyIdleState.js";

export class EnemyHitState extends EnemyState{
    constructor(enemy){
        super(enemy);
    }
    hitOver() {
        console.log("Enemy hit animation over");
        this.enemy.setState(new EnemyIdleState(this.Enemy));
    }
}