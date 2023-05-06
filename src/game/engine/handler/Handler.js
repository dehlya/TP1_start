export class Handler {
  constructor(game) {
    this.game = game;

    this.keys = new Array();
    this.activeKeys = new Array();
  }
  handleInput() {}

  handleMouseClick(event) {
    if (this.game.state.handleClick) {
      this.game.state.handleClick(event);
    }
  }

  // --> Key mapping
  // --> handling different sources : keyboard, mouse, touch, controller
  // --> handling different states : make the key go to the current state's handler
  // --> handling combinations
  // --> handling menu fonctions & player functions
  // --> handling activation & deactivations
  // --> trying to have only one object per key and not one object per key per state

  // --> command pattern ?
  // give game as a parameter to get to this.game.state.keyhandler.push(this)??
  // go on github bitch
}
