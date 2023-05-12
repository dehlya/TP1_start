import { LogoLayout } from "../layout/LogoLayout.js";
import { State } from "./State.js";
import { KeyHandler } from "../handler/KeyHandler.js";

export class LogoState extends State {
  constructor(game) {
    super(game);
    this.layout = new LogoLayout(this.game);
    this.layout.hardFrontier = true;
    this.keyHandler = new KeyHandler();
  }

  toMenu() {
    this.game.setCurrentState("Menu");
  }

  render() {
    console.log("LogoState render called");
    this.layout.draw();

    setTimeout(() => this.toMenu(), 2000);
  }
  enter() {
    super.enter();
    this.addCallbacks();
}

exit() {
    super.exit();
    this.keyHandler.removeAllCallbacks();
}
addCallbacks() {
}
}
