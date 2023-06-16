import { CharacterState } from "./CharacterState.js";
import { CharacterIdleState } from "./CharacterIdleState.js";
import { CharacterHitState } from "./CharacterHitState.js";
import { CharacterBlockingState } from "./CharacterBlockingState.js";
import { CharacterDashingState } from "./CharacterDashingState.js";
import { CharacterDeadState } from "./CharacterDeadState.js"
import { CharacterHealingState } from "./CharacterHealingState.js";
import { CharacterMovingState } from "./CharacterMovingState.js";

export class CharacterAttackState extends CharacterState{

    //constructor
    constructor(character) {
        super(character);
        this.character = character;
    }

    attackOver(){
        this.character.setState(new CharacterIdleState(this.character));
    }

    hit(value){
        this.character.looseHP(value);
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