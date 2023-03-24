export class Gravity {
    constructor(game) {
        this.yFloorCoordinates = 380;
        this.gravityFactor = 0.01;
        this.characters = [];
        this.particules = [];
        this.game = game;
    }
    manageGravity() {
        let characters = this.game.currentState.layout.characters;
        characters.forEach((character) => {
            if (character.yVelocity != 0) {
                let actualPosition = character.position.getPositionY();
                character.position.setPositionY(actualPosition + character.yVelocity);
                character.yVelocity += 0.20;
            }
            if (character.position.getPositionY() >= this.yFloorCoordinates) {
                character.yVelocity = 0;
            }
        });
        let particules = this.game.currentState.bullets;
        particules.forEach((particule) => {
            if (particule.y < 800) {
                particule.yVelocity += 0.010;
                let actualPosition = particule.y;
                particule.y = actualPosition + particule.yVelocity;
            }
        });
    }
    addCharacter(character) {
        this.characters.push(character);
    }
    addParticule(particule) {
        this.particules.push(particule);
    }
}
