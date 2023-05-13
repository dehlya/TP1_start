const LEVEL_JSON_PATH = '../../../../resources/json/levels.json';
export class LevelLoader {
    constructor(){
        this.data = "";
        this.load();
    }
    load(){
        this.data = JSON.parse(fs.readFileSync(LEVEL_JSON_PATH));
    }
    getFirstLevel(){
        console.log(this.data);
    }
}
