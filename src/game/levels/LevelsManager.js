export class LevelsManager {
    constructor(level) {
        this.currentLevel = level;
        this.levelsMap = new Map();
        this.levelsMap.set(1, this.currentLevel);
        
    }
    createLevel(Level){
        this.levelsMap.set(this.levelsMap.length, Level);
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