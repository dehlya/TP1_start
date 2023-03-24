import { Layout } from "./Layout.js";
import { Button } from "../interacter/Button.js";
export class CreditLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey";
        this.title = "Credit";
    }
    draw() {
        this.addBackground();
        this.addTitle();
        let playButton = new Button("../sprites/buttons/info.png", 300, 300, 600, 1200, 3, this.game);
        playButton.addClickListener(() => {
            this.game.setCurrentState(this.game.menuState);
        });
        super.draw();
    }
    addBackground() {
        let sky = new Image();
        sky.src = "../sprites/background/space/sky.png";
        this.game.canvas.getContext().drawImage(sky, 0, 0, 4096, 4096, 0, 0, 1800, 1000);
        let stars = new Image();
        stars.src = "../sprites/background/space/stars.png";
        this.game.canvas.getContext().drawImage(stars, 0, 0);
    }
    addTitle() {
        this.game.canvas.getContext().fillStyle = "white";
        let title = "Credit";
        this.context.font = "80px Bebas Neue";
        this.game.canvas.getContext().fillText(title, 400, 100);
    }
}
