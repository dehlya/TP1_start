import { LogoLayout } from "../layout/LogoLayout.js";
import { State } from "./State.js";

export class LogoState extends State {
  constructor(game) {
    super(game);
    this.layout = new LogoLayout(this.game);
    this.layout.hardFrontier = true;
  }

  toMenu() {
    this.game.setCurrentState(this.game.menuState);
  }

  render() {
    console.log("LogoState render called");
    this.layout.draw();

    setTimeout(() => this.toMenu(), 2000);
  }
}
