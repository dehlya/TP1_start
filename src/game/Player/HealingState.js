import { PlayerState } from "./PlayerState.js";
import { IdleState } from "./IdleState.js";
import { AttackState } from "./AttackState.js";
import { HitState } from "./HitState.js";
import { BlockingState } from "./BlockingState.js";
import { DashingState } from "./DashingState.js";
import { DeadState } from "./DeadState.js"
import { MovingState } from "./MovingState.js";

export class HealingState extends PlayerState{

    constructor(player) {
        super(player);
    }
    
}