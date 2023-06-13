import { CharacterState } from "./CharacterState.js";
import { CharacterIdleState } from "./CharacterIdleState.js";
import { CharacterAttackState } from "./CharacterAttackState.js";
import { CharacterBlockingState } from "./CharacterBlockingState.js";
import { CharacterDashingState } from "./CharacterDashingState.js";
import { CharacterDeadState } from "./CharacterDeadState.js"
import { CharacterHealingState } from "./CharacterHealingState.js";
import { CharacterMovingState } from "./CharacterMovingState.js";

export class CharacterHitState extends CharacterState{

    constructor(character) {
        super(character);
        this.character = character;
    }

    hitOver(){
        console.log("hit animation over");
        this.character.setState(new CharacterIdleState(this.character));
    }
    
}