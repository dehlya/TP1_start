import { CharacterState } from "./CharacterState.js";
import { CharacterAttackState } from "./CharacterAttackState.js";
import { CharacterHitState } from "./CharacterHitState.js";
import { CharacterBlockingState } from "./CharacterBlockingState.js";
import { CharacterDashingState } from "./CharacterDashingState.js";
import { CharacterDeadState } from "./CharacterDeadState.js"
import { CharacterHealingState } from "./CharacterHealingState.js";
import { CharacterMovingState } from "./CharacterMovingState.js";

export class CharacterIdleState extends CharacterState{

    //constructor
    constructor(character) {
        super(character);
    }

    // Override methods for IdleState

    attack() {
        this.character.setIsAttacking(true);
        this.character.looseStamina(20);
        this.character.setState(new CharacterAttackState(this.character));
        //Trigger attack animation        
        this.character.startAttackAnimation();
    }

    blockOn() {
        this.character.looseStamina(20);
        this.character.setState(new CharacterBlockingState(this.character));
        //Trigger block animation
        this.character.startBlockAnimation();
    }

    move(direction) {
        this.character.setState(new CharacterMovingState(this.character));
        //Trigger move animation (The animation will be defined by which way the character moves)
        this.character.startMoveAnimation(direction);
    }

    heal() {
        this.character.setState(new CharacterHealingState(this.character));
        this.character.usePotion();
        this.character.healAnimation();
        //Trigger the healing animation and decrease one Potion from the character
    }

    hit() {
        console.log("got hit during idle");
        this.character.looseHP(20);
        if(this.character.health <= 0){
            this.character.setState(new CharacterDeadState(this.character));
            //Trigger the death animation
        }
        else{
            this.character.setState(new CharacterHitState(this.character));
            this.character.hitAnimation();
            //Trigger the hit animation
        }
    }
    //end of the Override methods for IdleState
}