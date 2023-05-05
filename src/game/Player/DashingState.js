import { PlayerState } from "./PlayerState.js";
import { IdleState } from "./IdleState.js";
import { AttackState } from "./AttackState.js";
import { HitState } from "./HitState.js";
import { BlockingState } from "./BlockingState.js";
import { DeadState } from "./DeadState.js"
import { HealingState } from "./HealingState.js";
import { MovingState } from "./MovingState.js";

export class DashingState extends PlayerState{

    constructor(player) {
        super(player);
    }

    dashOver() {
        //WE NEED TO PUT HERE A CONDITION TO CHECK IF ON OF THE KEYS TO MOVE IS PRESSED !!!!!
        if(this.movKeyPressed()){
            return new MovingState(this.player);
        }
        else{
            return new IdleState(this.player);
        }
    }
    getHit() {
        //WE NEED TO PUT HERE A CONDITION TO CHECK IF THE PLAYER HIT BOX IS INVULNERABLE !!!!!
        if("invulnerable" == "invulnerable"){
            return this.player.currentState;
        }
        else{
            return new HitState(this.player);
        }
    }
}