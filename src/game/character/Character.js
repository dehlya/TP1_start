import { CharacterIdleState } from "./CharacterIdleState.js";
import { KeyHandler } from "../engine/handler/KeyHandler.js";

export class Character{
    keyHandler = new KeyHandler();

    //Constructor of the character class --------------------------------------
    constructor(x,y,canvas, ctx) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 70;
        this.height = 100;
        this.speed = 100;
        this.state = new CharacterIdleState(this);
        this.hpMax = 100;
        this.hp = this.hpMax;
        this._staminaMax = 100;
        this.stamina = this.staminaMax;
        this.moveSpeed = 100;
        this.attackPower = 20;
        this.potionsMax = 3;
        this.potions = this.potionsMax;
        this.constitution = 0;
        this.vigor = 0;
        this.dexterity = 0;
        this.strength = 0;
        this.faith = 0;
        this.state = new CharacterIdleState(this);
        this.hpMax = 100;
        this.hp = this.hpMax;
        this._staminaMax = 100;
        this.stamina = this.staminaMax;
        this.moveSpeed = 100;
        this.attackPower = 20;
        this.potionsMax = 3;
        this.potions = this.potionsMax;
        this.constitution = 0;
        this.vigor = 0;
        this.dexterity = 0;
        this.strength = 0;
        this.faith = 0;
        this.isAttacking = false;
        this.isMoving = false;
        this.currentImage = "../../../ressources/game/character/characterFrames/move_down/down_move_0.png";
        this.currentMoveDirection = "down";
        this.startStaminaRegeneration();
        this.keyHandler.addCallback('Space','keydown',() => this.attack());
    }

    render() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Load the character's image
        const image = new Image();
        image.onload = () => {
            // Draw the character's image on the canvas at its current position
            this.ctx.drawImage(image, this.x, this.y, this.width, this.height);
        };
        image.src = this.currentImage; // Set the image source after the onload handler is defined
    }

    //getter and setters ------------------------------------------------------
    setCurrentImage(value) {
        this.currentImage = value;
    }
    setCurrentMoveDirection(value) {
        this.currentMoveDirection = value;
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

    //functions attributes up -------------------------------------------------
    constitutionUp(value){
        this.constitution += value;
        this.hpMax += value*10;
    }
    vigorUp(value){
        this.vigor += value;
        this.staminaMax += value*10;
    }
    dexterityUp(value){
        this.dexterity += value;
        this.moveSpeed += value*5;
    }
    strengthUp(value){
        this.strength += value;
        this.moveSpeed += value*5;
    }
    constitutionDown(value){
        this.constitution -= value;
        this.hpMax -= value*5;
        if(this.constitution < 0){
            this.constitution = 0;
        }
    }
    vigorDown(value){
        this.vigor -= value;
        this.staminaMax -= value*5;
        if(this.vigor < 0){
            this.vigor = 0;
        }
    }
    dexterityDown(value){
        this.dexterity -= value;
        this.moveSpeed -= value*5;
        if(this.dexterity < 0){
            this.dexterity = 0;
        }
    }
    strengthDown(value){
        this.strength -= value;
        this.moveSpeed -= value*5;
        if(this.strength < 0){
            this.strength = 0;
        }
    }
    //End of functions attributes up ------------------------------------------

    //Functions specific for the character-------------------------------------
    looseStamina(value){
        this.stamina -= value;
        if(this.stamina < 0){
            this.stamina = 0;
        }
    }
    startStaminaRegeneration() {
        setInterval(() => {
            if (!this.isMoving && !this.isAttacking && this.stamina < this.staminaMax) {
                this.stamina += this.staminaMax/10;
                if (this.stamina > this.staminaMax) {
                    this.stamina = this.staminaMax;
                }
            }
        }, 1000); // Regenerate stamina every 1000 milliseconds (1 second)
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
    gainFaith(value){
        this.faith += value;
    }
    looseFaith(){
        this.faith = 0;
    }
    //End of functions specific for the character------------------------------


    //Functions used for attack------------------------------------------------
    attack(){
        // Can only be triggered if the stamina is greater than 0 and not currently attacking
        if(this.stamina > 0 && !this.isAttacking) {
            console.log("Attack Key Pressed");
            this.setIsAttacking(true);
            this.setIsMoving(false);
            this.state.attack();
        }
    }
    attackOver(){
        this.isAttacking = false;
        this.state.attackOver();
    }
    async startAttackAnimation() {
        console.log("Attack animation started " + this.stamina);
        let direction;
        switch (this.currentMoveDirection) {
            case 'up':
                direction = 'up';
                break;
            case 'down':
                direction = 'down';
                break;
            case 'left':
                direction = 'left';
                break;
            case 'right':
                direction = 'right';
                break;
            default:
                console.log('Invalid direction');
                return;
        }
        const imageCount = 5;
        this.currentFrame = 1;

        // Start the animation loop for the specified direction
        while (this.isAttacking) {
            console.log(this.currentMoveDirection);
            const currentImage = `../../../ressources/game/character/characterFrames/attack/attack_${direction}_${this.currentFrame}.png`;
            this.setCurrentImage(currentImage);
            console.log('Current frame: ' + this.currentImage);

            this.currentFrame++;
            if (this.currentFrame >= imageCount) {
                this.currentFrame = 1;
                this.attackOver();
                this.setCurrentImage(`../../../ressources/game/character/characterFrames/move_${direction}/${direction}_move_0.png`);
            }

            await this.delay(100); // Delay for 1 second
        }

        this.currentFrame = 0;

        this.attackOver();
        console.log(this.currentImage);
    }
    //End of functions used for attack-----------------------------------------


    //Functions handling the hits---------------------------------------------
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
    //End of functions handling the hits--------------------------------------


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
        this.setCurrentImage(`${imageFolder}/${direction}_move_${this.currentFrame}.png`);
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