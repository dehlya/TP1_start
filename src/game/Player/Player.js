import { IdleState } from "./IdleState.js";
import { AttackState } from "./AttackState.js";
import { HitState } from "./HitState.js";
import { BlockingState } from "./BlockingState.js";
import { DashingState } from "./DashingState.js";
import { DeadState } from "./DeadState.js"
import { HealingState } from "./HealingState.js";
import { MovingState } from "./MovingState.js";


export class Player{

    //Constructor of the player class
    constructor() {
        this.state = new IdleState(this);
        this.hpMax = 100;
        this.hp = this.hpMax;
        this._staminaMax = 100;
        this.stamina = this.staminaMax;
        this.potionsMax = 3;
        this.potions = this.potionsMax;
        this.constitution = 12;
        this.vigor = 12;
        this.dexterity = 12;
        this.strength = 12;
        this.faith = 0;
        this.isAttacking = false;

    }

    //getter and setters
    setState(state) {
        this.state = state;
    }
    looseStamina(value){
        this.stamina -= value;
        if(this.stamina < 0){
            this.stamina = 0;
        }
    }
    looseHP(value){
        this.hp -= value;
    }
    usePotion(){
        this.potions--;
    }
    get staminaMax(){
        return this._staminaMax;
    }
    set staminaMax(value){
        this._staminaMax = value;
    }

    //ALTERNATE FUNCTION TO CHANGE STATE NOT IN USE FOR THE MOMENT
    // Methods to change states depending on the currentState;
    handleInput(keyCode) {
        switch (keyCode) {
            case "Attack":
                this.state.atkKeyPressed(this);
                break;
            case "Block":
                this.state.blockKeyPressed(this);
                break;
            case "Dash":
                this.state.dashKeyPressed(this);
                break;
            case "Move":
                this.state.movKeyPressed(this);
                break;
            case "Heal":
                this.state.healKeyPressed(this);
                break;
            // other cases for different keys or events
        }
    }
    //END OF ALTERNATE FUNCTION !!!!!!!!!!!


    //Functions used for attack
    atkKeyPressed(){
        // Can only be triggered if the stamina is greater than 0 and not currently attacking
        console.log("Attack Key Pressed");
        if(this.stamina > 0 && !this.isAttacking) {
            this.isAttacking = true;
            this.state = this.state.atkKeyPressed();
        }
    }
    atkOver(){
        this.isAttacking = false;
        this.state = this.state.atkOver();
    }
    startAttackAnimation() {
        // Start attack animation here
        this.looseStamina(20);
        console.log("Attack animation started " + this.stamina + " " + this.state);
        setTimeout(() => {
          // After animation is complete, trigger atkOver() function
            this.setState(new AttackState(this));
            console.log("Attack animation finished");
            this.atkOver();
        }, 1000); // TEMPORARY VALUE attack duration 1 sec
    }
    //End of functions used for attack


    //Functions handeling the hits
    getHit(){
        console.log("You got hit " + this.state);
        this.state = this.state.getHit();
    }
    hitOver(){
        this.state = this.state.hitOver();
    }
    hitAnimation(){
        this.looseHP(20);
        console.log("Hit animation started " + this.hp);
        setTimeout(() => {
            this.state = new HitState(this);
            this.state.hitOver();
            console.log("Hit animation finished");
        }, 2000);
    }
    //End of functions handeling the hits

    
    //Functions used for block
    blocKeyPressed(){
        // Can only be triggered if the stamina is greater than 0
        if(this.stamina > 0) {
            this.state = this.state.blockKeyPressed();
        }
    }
    blockKeyReleased(){
        this.state = this.state.blockKeyReleased();
    }
    //End of functions used for block


    //Functions used for Dash
    dashKeyPressed(){
        // Can only be triggered if the stamina is greater than 0
        if(this.stamina > 0){
            this.state = this.state.dashKeyPressed();
        }
    }
    dashOver(){
        this.state = this.state.dashOver();
    }
    //END of functions used for dash


    //Functions used to move
    movKeyPressed(){
        this.state = this.state.movKeyPressed();
    }
    movKeyReleased(){
        this.state = this.state.movKeyReleased()
    }
    //End of functions used to move


    //Functions used to heal
    healKeyPressed(){
        if(this.potions > 0) {
            this.state = this.state.healKeyPressed();
        }
    }
    healOver(){
        this.state = this.state.healOver();
    }
    //END of function to heal
}