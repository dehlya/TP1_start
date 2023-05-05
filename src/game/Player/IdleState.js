import { PlayerState } from "./PlayerState.js";
import { AttackState } from "./AttackState.js";
import { HitState } from "./HitState.js";
import { BlockingState } from "./BlockingState.js";
import { DashingState } from "./DashingState.js";
import { DeadState } from "./DeadState.js"
import { HealingState } from "./HealingState.js";
import { MovingState } from "./MovingState.js";

export class IdleState extends PlayerState{

    //constructor
    constructor(player) {
        super(player);
    }

    // Override methods for IdleState
    atkKeyPressed() {
        this.player.setState(new AttackState(this.player));
        this.player.startAttackAnimation();
        //Trigger attack animation
    }

    blockKeyPressed() {
        this.player.setState(new BlockingState(this.player));
        //Trigger block animation
    }

    movKeyPressed() {
        this.player.setState(new MovingState(this.player));
        //Trigger move animation (The animation will be defined by which way the Player moves)
    }

    healKeyPressed() {
        if(this.player.potions > 0){
            this.player.setState(new HealingState(this.player));
            this.player.usePotion();
            //Trigger the healing animation and decrease one Potion from the Player
        }
    }

    getHit() {
        console.log("got hit during idle");
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
    //end of the Override methods for IdleState
}