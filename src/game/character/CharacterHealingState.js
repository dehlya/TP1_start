import { CharacterState } from "./CharacterState.js";
import { CharacterIdleState } from "./CharacterIdleState.js";
import { CharacterAttackState } from "./CharacterAttackState.js";
import { CharacterHitState } from "./CharacterHitState.js";
import { CharacterBlockingState } from "./CharacterBlockingState.js";
import { CharacterDashingState } from "./CharacterDashingState.js";
import { CharacterDeadState } from "./CharacterDeadState.js"
import { CharacterMovingState } from "./CharacterMovingState.js";

export class CharacterHealingState extends CharacterState{

    constructor(character) {
        super(character);
    }
    hit(value){
        this.character.looseHP(value);
        console.log("got hit during healing");
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
    healOver(){
        this.character.regainHP(20);
        console.log("healing over " + this.character.hp);
        this.character.setState(new CharacterIdleState(this.character));
    }
    
}