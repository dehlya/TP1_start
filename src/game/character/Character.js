import { CharacterIdleState } from "./CharacterIdleState.js";
import { KeyHandler } from "../engine/handler/KeyHandler.js";
import { CharacterDeadState } from "./CharacterDeadState.js";
import { GameOverState } from "../engine/state/GameOverState.js";

    export class Character {
        keyHandler = new KeyHandler();
        //Constructor of the character class --------------------------------------
        constructor(x,y,canvas, ctx, parent) {
            this.x = x; // Position on the X axis
            this.y = y; // Position on the Y axis
            this.parent = parent; // Reference to the PlayLayout parent
            this.canvas = canvas; // Current canvas
            this.ctx = ctx; // Context on which we draw the amazing character
            this.width = 70; // With of the character
            this.height = 100; // Height of the character
            this.state = new CharacterIdleState(this);
            this.hp = this.hpMax = 100;
            this._staminaMax = 10000;
            this.stamina = this.staminaMax;
            this.moveSpeed = 1;
            this.attackPower = 20;
            this.potions = this.potionsMax = 3;
            this.constitution = 0;
            this.vigor = 0;
            this.dexterity = 0;
            this.strength = 0;
            this.faith = 0;
            this.isAttacking = false;
            this.isMoving = false;
            this.isHit = false;
            this.isDrinking = false;
            this.currentImage = "../../../ressources/game/character/characterFrames/move_down/down_move_0.png";
            this.image = new Image();
            this.image.src = this.currentImage;
            this.centerX = this.image.width / 2;
            this.centerY = this.image.height / 2;
            this.image.onload = () => {
                this.render(); // Once the image is loaded, you can render it on the canvas
            };
            this.currentMoveDirection = "down";
            this.nextMoveDirection = null;
            this.startStaminaRegeneration();

            //key handler attack
            this.keyHandler.addCallback('Space','keydown',() => this.attack());

            //key handlers movement
            this.keyHandler.addCallback('KeyW', 'keydown', () => this.move('up'));
            this.keyHandler.addCallback('KeyS', 'keydown', () => this.move('down'));
            this.keyHandler.addCallback('KeyA', 'keydown', () => this.move('left'));
            this.keyHandler.addCallback('KeyD', 'keydown', () => this.move('right'));
            if(!this.isMoving){
                this.keyHandler.addCallback('KeyW', 'keyup', () => this.stop());
                this.keyHandler.addCallback('KeyS', 'keyup', () => this.stop());
                this.keyHandler.addCallback('KeyA', 'keyup', () => this.stop());
                this.keyHandler.addCallback('KeyD', 'keyup', () => this.stop());
            }

            //key handler heal
            this.keyHandler.addCallback('ShiftLeft', 'keydown', () => this.heal());

            //test hp
            this.keyHandler.addCallback('KeyO', 'keydown', () => this.hit(20, this.parent));
        }


        render(){
        }

        drawCharacter() {
            this.ctx.drawImage(this.image, this.x, this.y);
            this.parent.getEnemies().forEach(enemy => {
                if(Math.abs((enemy.getX() - (this.x + this.centerX))) < 30
                    && Math.abs((enemy.getY() - (this.y + this.centerY))) < 30){
                    this.hit(enemy.getAttackPower());
                }
            })
        }

        setCurrentImage(value) {
            this.currentImage = value;
            this.image.src = value; // Update the image source
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
        getHealth(){
            return this.hp;
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
            console.log(this.hp);
            if (this.hp <= 0){
                console.log("I'm dead!");
                this.state = new CharacterDeadState(this);
                console.log("new game over state");
                this.game.state = new GameOverState();
            }
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
            this.setCurrentImage(`../../../ressources/game/character/characterFrames/move_${this.currentMoveDirection}/${this.currentMoveDirection}_move_0.png`);
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
            const imageCount = 4;
            this.currentFrame = 0;

            // Start the animation loop for the specified direction
            for(let i = 0; i < imageCount; i++) {
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
        hit(value){
            if(this.isHit == false){
                console.log("You got hit");
                this.stop();
                this.isHit = true;
                this.state.hit(value);
            }
        }
        hitOver(){
            this.state.hitOver();
        }
        async hitAnimation(){
            console.log("Hit animation started " + this.hp);
            this.setCurrentImage(`../../../ressources/game/character/characterFrames/move_${this.currentMoveDirection}/${this.currentMoveDirection}_move_0.png`);
            await this.delay(400);
            this.hitOver();
            await this.delay(2000);
            this.isHit = false;
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
        move(direction) {
            if(!this.parent.game.isCurrentlyRunning()) {
                return;
            }
            this.nextMoveDirection = direction;
            if (this.isMoving && direction === this.currentMoveDirection) {
                return;
            }

            this.currentMoveDirection = direction;
            this.state.move(direction);
            this.isMoving = true;
        }
        async startMoveAnimation() {
            this.isMoving = true;
            console.log("Move animation started");
            console.log(this.currentImage);

            // The animation depends on which way the character goes
            const direction = this.nextMoveDirection;
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
            let imageCount = 0;
            if(direction == 'up' || direction == 'down') {
                imageCount = 8;
            }
            else{
                imageCount = 6;
            }
            this.currentFrame = 1;

            const moveStep = () => {
                let newX = this.x;
                let newY = this.y;

                switch (direction) {
                    case 'up':
                        newY -= this.moveSpeed;
                        break;
                    case 'down':
                        newY += this.moveSpeed;
                        break;
                    case 'left':
                        newX -= this.moveSpeed;
                        break;
                    case 'right':
                        newX += this.moveSpeed;
                        break;
                    default:
                        console.log('Invalid direction');
                        return;
                }

                // Check if the new position is within the canvas boundaries
                if (newX >= 100 && newX + this.width <= this.canvas.width - 100 && newY >= 50 && newY + this.height <= this.canvas.height - 80) {
                    this.x = newX;
                    this.y = newY;
                    this.render(); // Render the character at the new position
                }

                if (this.isMoving && direction === this.currentMoveDirection) {
                    requestAnimationFrame(moveStep); // Repeat the movement recursively
                }
            };

            // Call the moveStep function to start the movement
            moveStep();

            // Start the animation loop for the specified direction
            while (this.isMoving && direction === this.currentMoveDirection) {
                const currentImage = `../../../ressources/game/character/characterFrames/${imageFolder}/${direction}_move_${this.currentFrame}.png`;
                this.setCurrentImage(currentImage);

                this.currentFrame++;
                if (this.currentFrame >= imageCount) {
                    this.currentFrame = 0;
                }

                await this.delay(100); // Delay for 100 milliseconds (0.1 second)
            }

            this.currentFrame = 0;
            this.setCurrentImage(`../../../ressources/game/character/characterFrames/${imageFolder}/${direction}_move_${this.currentFrame}.png`);

            this.isMoving = false;
        }
        stop(){
            this.state.stop();
            this.currentFrame = 0;
            this.isMoving = false;
            this.nextMoveDirection = null;
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
                this.isDrinking = true;
            }
        }
        healOver(){
            this.state.healOver();
            this.isDrinking = false;
        }
        async healAnimation(){
            console.log("Heal animation started ");

            const imageCount = 7;
            this.currentFrame = 0;

            // Start the animation loop for drinking potion
            for (let i = 0; i < imageCount; i++) {
                const currentImage = `../../../ressources/game/character/characterFrames/Potion/drinking_potion_${this.currentFrame}.png`;
                this.setCurrentImage(currentImage);
                console.log('Current frame: ' + currentImage);

                this.currentFrame++;
                if (this.currentFrame >= imageCount) {
                    this.currentFrame = 0;
                    this.healOver();
                    this.setCurrentImage(`../../../ressources/game/character/characterFrames/move_${this.currentMoveDirection}/${this.currentMoveDirection}_move_0.png`);
                }

                await this.delay(100); // Delay for 100 milliseconds (adjust as needed)
            }

            this.currentFrame = 0;
            this.healOver();
        }
        //END of function to heal--------------------------------------------------

        //Additional utility Functions---------------------------------------------
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        //End of additional utility functions--------------------------------------
    }