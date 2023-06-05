import {EnemyState} from "./EnemyState.js";
import {EnemyIdleState} from "./EnemyIdleState.js";
import {CharacterDeadState} from "../character/CharacterDeadState.js";
import {CharacterHitState} from "../character/CharacterHitState.js";

export class EnemyAttackState extends EnemyState {
    constructor(enemy) {
        super(enemy);
    }

    attackOver() {
        this.enemy.setState(new EnemyIdleState(this.enemy));
        console.log("enemy attack is over");
    }
    hit(){
        console.log("enemy hit during attack");
        if(this.character.getHealth() <= 0){
            this.character.setState(new CharacterDeadState(this.character));
            //Trigger the death animation
        }
        else{
            this.character.setState(new CharacterHitState(this.character));
            this.character.hitAnimation();
            //Trigger the hit animation
        }
    }
}