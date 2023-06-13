import { CharacterState } from "./CharacterState.js";
import { CharacterIdleState } from "./CharacterIdleState.js";
import { CharacterAttackState } from "./CharacterAttackState.js";
import { CharacterHitState } from "./CharacterHitState.js";
import { CharacterDashingState } from "./CharacterDashingState.js";
import { CharacterDeadState } from "./CharacterDeadState.js"
import { CharacterHealingState } from "./CharacterHealingState.js";
import { CharacterMovingState } from "./CharacterMovingState.js";

export class CharacterBlockingState extends CharacterState{

    constructor(character) {
        super(character);
    }

    blockOff() {
        this.character.stopBlockAnimation();
        this.character.setState(new CharacterIdleState(this.character));
    }
    hit() {
        if(this.character.stamina <= 0){
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
        else {
            console.log("got hit during blocking");
            this.character.looseStamina(20);
        }
    }
}