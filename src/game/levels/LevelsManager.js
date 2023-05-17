const LEVEL_JSON_PATH = "../../../ressources/game/json/levels.json";
import {Level} from "./Level.js";

export class LevelsManager {
    constructor(game) {
        this.game = game;
        this.currentLevel;
        this.levelsMap = new Map();
        this.numberOfLevels = 0;
        this.init();
        
    }
    init(){
        fetch(LEVEL_JSON_PATH)
        .then((response) => response.json())
        .then((json) => {
            json.levels.forEach(level => {
                this.createLevel(level.title, level.description);
            });
            this.numberOfLevels = json.numberOfLevels;
        });
    }

    createLevel(title, description){
        this.levelsMap.set(this.levelsMap.length, new Level(this.game, title, description));
    }
    firstLevel(){
        this.currentLevel.end();
        this.currentLevel = this.levelsMap.get(1);
        this.currentLevel.start();
    }
    nextLevel(){
        this.currentLevel.end();
        this.currentLevel = this.levelsMap.get(this.currentLevel.key + 1);
        this.currentLevel.start();
    }
    previousLevel(){
        this.currentLevel.end();
        this.currentLevel = this.levelsMap.get(this.currentLevel.key - 1);
        this.currentLevel.start();
    }
    goToLevel(number){
        this.currentLevel.end();
        this.currentLevel = this.levelsMap.get(number);
        this.currentLevel.start();
    }

}