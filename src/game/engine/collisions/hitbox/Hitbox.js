const HITBOXES_JSON_PATH = '../../../resources/game/json/hitboxes.json';

export class Hitbox{
    constructor(img){
        this.img = img; 
        this.points = this.getPoints(img);
    }
    getPoints(img){
        getDataFromJson(img);

    }
    getDataFromJson(img){
        //fetch(HITBOXES_JSON_PATH)
        // .then((response) => response.json())
        // .then((json) => {
        //     json.levels.forEach(level => {
        //         this.createLevel(level.title, level.description);
        //     });
        //     this.numberOfLevels = json.numberOfLevels;
        // });
    }
    
}