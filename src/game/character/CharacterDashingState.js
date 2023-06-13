import { CharacterState } from "./CharacterState.js";
import { CharacterIdleState } from "./CharacterIdleState.js";
import { CharacterAttackState } from "./CharacterAttackState.js";
import { CharacterHitState } from "./CharacterHitState.js";
import { CharacterBlockingState } from "./CharacterBlockingState.js";
import { CharacterDeadState } from "./CharacterDeadState.js"
import { CharacterHealingState } from "./CharacterHealingState.js";
import { CharacterMovingState } from "./CharacterMovingState.js";

export class CharacterDashingState extends CharacterState{

    constructor(character) {
        super(character);
    }

    dashOver() {
        //WE NEED TO PUT HERE A CONDITION TO CHECK IF ON OF THE KEYS TO MOVE IS PRESSED !!!!!
        if(this.character.getIsMoving() == true){
            console.log("Dashing over and character moving");
            this.character.setState(new CharacterMovingState(this.character));
        }
        else{
            console.log("Dashing over and character stopped");
            this.character.setState(new CharacterIdleState(this.character));
        }
    }
    hit() {
        //WE NEED TO PUT HERE A CONDITION TO CHECK IF THE character HIT BOX IS INVULNERABLE !!!!!
        if("invulnerable" == "invulnerable"){
        }
        else{
            this.character.setState(new CharacterHitState(this.character));
        }
    }
    stop() {
        this.character.setIsMoving(false);
    }
    move() {
        this.character.setIsMoving(true);
    }
}