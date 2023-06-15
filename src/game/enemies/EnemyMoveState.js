import {EnemyState} from "./EnemyState.js";
import {EnemyDeadState} from "./EnemyDeadState.js";
import {EnemyHitState} from "./EnemyHitState.js";

export class EnemyMoveState extends EnemyState {
    constructor(enemy) {
        super(enemy);
    }

    hit(value) {
        this.enemy.looseHP(value);
        if(this.enemy.getHealth <= 0) {
            this.enemy.setState(new EnemyDeadState(this.enemy));
        }
        else{
            this.enemy.setState(new EnemyHitState(this.enemy));
        }
    }
}