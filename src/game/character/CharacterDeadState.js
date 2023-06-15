import { CharacterState } from "./CharacterState.js";
import { CharacterIdleState } from "./CharacterIdleState.js";
import { CharacterAttackState } from "./CharacterAttackState.js";
import { CharacterHitState } from "./CharacterHitState.js";
import { CharacterBlockingState } from "./CharacterBlockingState.js";
import { CharacterDashingState } from "./CharacterDashingState.js";
import { CharacterHealingState } from "./CharacterHealingState.js";
import { CharacterMovingState } from "./CharacterMovingState.js";
import { GameOverState } from "../engine/state/GameOverState.js";
//src/game/engine/state/GameOverState.js
//src/game/character/CharacterDeadState.js

export class CharacterDeadState extends CharacterState{

    constructor(character) {
        super(character);
    }

    die() {
        console.log("in character dead state, die");
        this.character.setCurrentState("CharacterDeadState");
        this.game.setCurrentState("GameOver");
    }

}