import {EnemyState} from "./EnemyState.js";
import {EnemyMoveState} from "./EnemyMoveState.js";
import {EnemyAttackState} from "./EnemyAttackState.js";
import {EnemyDeadState} from "./EnemyDeadState.js";

export class EnemyIdleState extends EnemyState {
    constructor(enemy) {
        super(enemy);
    }

    attack() {
        this.enemy.setState(new EnemyAttackState(this.enemy));
        this.enemy.startAttackAnimation();
    }
    move(direction) {
        this.enemy.setState(new EnemyMoveState(this.enemy, direction));
        this.enemy.startMoveAnimation(direction);
    }
    hit() {
        console.log("enemy hit during idle state");
        this.enemy.looseHP(20);
        if(this.enemy.getHealth() <= 0) {
            this.enemy.setState(new EnemyDeadState(this.enemy));
        }
        else{
            this.enemy.setState(new EnemyIdleState(this.enemy));
            this.enemy.hitAnimation();
        }
    }
}