import {EnemyState} from "./EnemyState.js";
import {EnemyIdleState} from "./EnemyIdleState.js";
import {EnemyAttackState} from "./EnemyAttackState.js";
import {EnemyDeadState} from "./EnemyDeadState.js";
import {EnemyHitState} from "./EnemyHitState.js";

export class EnemyMoveState extends EnemyState {
    constructor(enemy) {
        super(enemy);
    }

    stop() {
        this.enemy.setState(new EnemyIdleState(this.enemy));
        this.enemy.stopMoveAnimation();
    }
    attack() {
        this.enemy.setState(new EnemyAttackState(this.enemy));
        this.enemy.StartAttackAnimation();
    }
    hit() {
        this.enemy.looseHP(20);
        if(this.enemy.getHealth <= 0) {
            this.enemy.setState(new EnemyDeadState(this.enemy));
        }
        else{
            this.enemy.setState(new EnemyHitState(this.enemy));
        }
    }
}