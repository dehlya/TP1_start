import { PlayerState } from "./PlayerState.js";
import { IdleState } from "./IdleState.js";
import { AttackState } from "./AttackState.js";
import { BlockingState } from "./BlockingState.js";
import { DashingState } from "./DashingState.js";
import { DeadState } from "./DeadState.js"
import { HealingState } from "./HealingState.js";
import { MovingState } from "./MovingState.js";

export class HitState extends PlayerState{

    constructor(player) {
        super(player);
    }

    hitOver(){
        this.player.setState(new IdleState(this));
    }
    
}