import { PlayerState } from "./PlayerState.js";
import { IdleState } from "./IdleState.js";
import { HitState } from "./HitState.js";
import { BlockingState } from "./BlockingState.js";
import { DashingState } from "./DashingState.js";
import { DeadState } from "./DeadState.js"
import { HealingState } from "./HealingState.js";
import { MovingState } from "./MovingState.js";

export class AttackState extends PlayerState{

    //constructor
    constructor(player) {
        super(player);
    }

    atkOver(){
        this.player.setState(new IdleState(this));
    }

    getHit(){
        console.log("got hit during attack");
        if(this.player.health <= 0){
            this.player.setState(new DeadState(this.player));
            //Trigger the death animation
        }
        else{
            this.player.setState(new HitState(this.player));
            this.player.hitAnimation();
            //Trigger the hit animation
        }
    }

}