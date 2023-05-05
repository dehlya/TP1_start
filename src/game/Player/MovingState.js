import { PlayerState } from "./PlayerState.js";
import { IdleState } from "./IdleState.js";
import { AttackState } from "./AttackState.js";
import { HitState } from "./HitState.js";
import { BlockingState } from "./BlockingState.js";
import { DashingState } from "./DashingState.js";
import { DeadState } from "./DeadState.js"
import { HealingState } from "./HealingState.js";

export class MovingState extends PlayerState{

    movKeyReleased() {
        this.player.setState(new IdleState(this.player));
        //stop moving animation
    }
    atkKeyPressed() {
        this.player.setState(new AttackState(this.player));
        //Stop moving animation and start attack animation
        this.player.atkOver();
    }
    blockKeyPressed() {
        this.player.setState(new BlockingState(this.player));
        //Stop moving animation and start block animation
    }
    dashKeyPressed() {
        this.player.setState(new DashingState(this.player));
        //Stop moving animation and start dash animation
        this.player.dashOver();
    }

    getHit() {
        this.player.looseHP(20 /*Temporary value*/);
        if(this.player.health <= 0){
            this.player.setState(new DeadState(this.player));
            //Stop moving and trigger death animation
        }
        else{
            this.player.setState(new this.getHit(this.player));
            //Stop moving and trigger hit animation
        }
    }
    healKeyPressed() {
        if(this.player.potions > 0){
            this.player.setState(new HealingState(this.player));
            this.player.usePotion();
            //Stop moving animation and start the healing animation decrease one Potion from the Player
            this.player.healOver();
        }
    }
}