import { Character } from "./Character.js";
import { CharacterState } from "./CharacterState.js";
import { CharacterIdleState } from "./CharacterIdleState.js";
import { CharacterAttackState } from "./CharacterAttackState.js";
import { CharacterHitState } from "./CharacterHitState.js";
import { CharacterBlockingState } from "./CharacterBlockingState.js";
import { CharacterDashingState } from "./CharacterDashingState.js";
import { CharacterDeadState } from "./CharacterDeadState.js"
import { CharacterHealingState } from "./CharacterHealingState.js";
import { CharacterMovingState } from "./CharacterMovingState.js";


const character = new Character();

/*character.attack();
character.hit();
character.blockOn();
character.hit();
character.blockOff();
character.move();
character.dash();
character.stop();
character.heal();*/
character.move('left'); 
character.stop();
//currentFrame++ qui dsemble être commun à tous les states. --> Reset à 0 au changement de state.
//character.idleState = null;
//new CharacterState() vérifié de bien tuer l'autre
character.move('right');
character.stop();
character.move('up');
//character.move('left');
/*await sleep(10000);
character.move('right');*/