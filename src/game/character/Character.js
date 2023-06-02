import { CharacterIdleState } from "./CharacterIdleState.js";
import { CharacterAttackState } from "./CharacterAttackState.js";
import { CharacterHitState } from "./CharacterHitState.js";
import { CharacterBlockingState } from "./CharacterBlockingState.js";
import { CharacterDashingState } from "./CharacterDashingState.js";
import { CharacterDeadState } from "./CharacterDeadState.js"
import { CharacterHealingState } from "./CharacterHealingState.js";
import { CharacterMovingState } from "./CharacterMovingState.js";


export class Character{
    hpMax: number;
    hp: number;
    _staminaMax: number;

    //Constructor of the character class --------------------------------------
    constructor() {
        this.state = new CharacterIdleState(this);
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
        this.isMoving = false;
        this.currentImage = "characterFrames/move_down/down_move_0.png";
    }

    //getter and setters ------------------------------------------------------
    setCurrentImage(value) {
        this.currentImage = value;
    }
    setState(state) {
        this.state = null;
        this.state = state;
    }
    setIsAttacking(value) {
        this.isAttacking = value;
    }
    getIsAttacking(){
        return this.isAttacking;
    }
    setIsMoving(value) {
        this.isMoving = value;
    }
    getIsMoving(){
        return this.isMoving;
    }
    get staminaMax(){
        return this._staminaMax;
    }
    set staminaMax(value){
        this._staminaMax = value;
    }
    //End of getter and setters -----------------------------------------------
    
    //Functions specific for the character-------------------------------------
    looseStamina(value){
        this.stamina -= value;
        if(this.stamina < 0){
            this.stamina = 0;
        }
    }
    regainHP(value){
        if(this.hp + value > this.hpMax){
            this.hp = this.hpMax;
        }
        else{
            this.hp += value;
        }
    }
    looseHP(value){
        this.hp -= value;
    }
    usePotion(){
        this.potions--;
    }
    //End of functions specific for the character------------------------------


    //Functions used for attack------------------------------------------------
    attack(){
        // Can only be triggered if the stamina is greater than 0 and not currently attacking
        console.log("Attack Key Pressed");
        if(this.stamina > 0 && !this.isAttacking) {
            this.state.attack();
        }
    }
    attackOver(){
        this.isAttacking = false;
        this.state.attackOver();
    }
    startAttackAnimation() {
        console.log("Attack animation started " + this.stamina);
        this.attackOver();
    }
    //End of functions used for attack-----------------------------------------


    //Functions handeling the hits---------------------------------------------
    hit(){
        console.log("You got hit");
        this.state.hit();
    }
    hitOver(){
        this.state.hitOver();
    }
    hitAnimation(){
        console.log("Hit animation started " + this.hp);
        this.hitOver();
    }
    //End of functions handeling the hits--------------------------------------


    //Functions used for block-------------------------------------------------
    blockOn(){
        // Can only be triggered if the stamina is greater than 0
        if(this.stamina > 0) {
            this.state.blockOn();
        }
    }
    startBlockAnimation() {
        console.log("Block animation started " + this.stamina);
    }
    blockOff(){
        this.state.blockOff();
    }
    stopBlockAnimation() {
        console.log("Block animation stopped " + this.stamina);
    }
    //End of functions used for block------------------------------------------


    //Functions used for Dash--------------------------------------------------
    dash(){
        // Can only be triggered if the stamina is greater than 0
        if(this.stamina > 0){
            this.state.dash();
        }
    }
    dashOver(){
        console.log("Dash over");
        this.state.dashOver();
    }
    dashAnimation(){
        console.log("Dash animation started " + this.stamina);
        this.dashOver();
    }
    //END of functions used for dash-------------------------------------------


    //Functions used to move---------------------------------------------------
    move(direction){
        if (this.isMoving && direction === this.currentMoveDirection) {
            return;
        }
        this.currentMoveDirection = direction;
        this.state.move(direction);
    }
    async startMoveAnimation(direction) {
        if (this.isMoving) {
            return;
        }
        this.isMoving = true;
        console.log("Move animation started");
        console.log(this.currentImage);
        console.log(direction);
    
        // The animation depends on which way the character goes
        let imageFolder;
        switch (direction) {
        case 'up':
            imageFolder = 'move_up';
            break;
        case 'down':
            imageFolder = 'move_down';
            break;
        case 'left':
            imageFolder = 'move_left';
            break;
        case 'right':
            imageFolder = 'move_right';
            break;
        default:
            console.log('Invalid direction');
            return;
        }
        const imageCount = 8;
        this.currentFrame = 0;
    
        // Start the animation loop for the specified direction
        while (this.isMoving && direction === this.currentMoveDirection) {
        console.log(direction);
        const currentImage = `${imageFolder}/${direction}_move_${this.currentFrame}.png`;
        this.setCurrentImage(currentImage);
        console.log('Current frame: ' + this.currentImage);
    
        this.currentFrame++;
        if (this.currentFrame >= imageCount) {
            this.currentFrame = 0;
        }
    
          await this.delay(1000); // Delay for 1 second
        }
    
        this.currentFrame = 0;
    }
    stop(){
        this.state.stop();
    }
    stopMoveAnimation(){
        console.log("Move animation stopped");
        this.isMoving = false;
    }
    //End of functions used to move--------------------------------------------


    //Functions used to heal---------------------------------------------------
    heal(){
        if(this.potions > 0 && this.hp < this.hpMax){
            this.state.heal();
        }
    }
    healOver(){
        this.state.healOver();
    }
    healAnimation(){
        console.log("Heal animation started ");
        this.healOver();
    }
    //END of function to heal--------------------------------------------------

    //Additional utility Functions---------------------------------------------
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //End of additional utility functions--------------------------------------
}