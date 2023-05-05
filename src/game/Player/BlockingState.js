import { PlayerState } from "./PlayerState.js";
import { IdleState } from "./IdleState.js";
import { AttackState } from "./AttackState.js";
import { HitState } from "./HitState.js";
import { DashingState } from "./DashingState.js";
import { DeadState } from "./DeadState.js"
import { HealingState } from "./HealingState.js";
import { MovingState } from "./MovingState.js";

export class BlockingState extends PlayerState{

    constructor(player) {
        super(player);
    }

    blockKeyReleased() {
        return new IdleState(this.player);
    }
    getHit() {
        if(this.player.stamina <= 0){
            return new IdleState(this.player);
        }
        else {
            //Insert equation loss of stamina
            return this.player.currentState;
        }
    }
}