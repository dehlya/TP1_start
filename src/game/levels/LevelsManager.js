import axios from 'axios';
const LEVEL_JSON_PATH = "../../../ressources/game/json/levels.json";

export class LevelsManager {
  constructor(game) {
    this.game = game;
    this.currentLevel;
    this.levelsMap = new Map();
    this.numberOfLevels = 0;
    this.init();
  }

  async init() {
    try {
      const response = await axios.get(LEVEL_JSON_PATH);
      const jsonData = response.data;
      
      jsonData.levels.forEach(level => {
        this.createLevel(level.title, level.description);
      });
      
      this.numberOfLevels = jsonData.numberOfLevels;
    } catch (error) {
      console.error(error);
    }
  }

  createLevel(title, description) {
    const levelData = {
      title: title,
      description: description
    };
      
    axios.post('https://dev-mewebdevtest.pantheonsite.io/wp-json/wp/v2/posts', levelData)
      .then(response => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      
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
