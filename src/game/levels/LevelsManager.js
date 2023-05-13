export class LevelsManager {
    constructor(level) {
        this.currentLevel = level;
        this.levelsMap = new Map();
        //this.init();
        
    }
    init(){
        $.ajax({
            dataType: "json",
            url: './Levels.ajax.js',
            data: [{
                action : "getFirstLevel"
            }]
        })
        .done(function(data){
            this.data = data;
            console.log(this.data);
        });
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