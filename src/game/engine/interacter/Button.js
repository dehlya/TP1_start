export class Button {
  /*constructor(src, x, y, originalImageWidth, originalImageHeight, factor, game) {
        // parameters still to choose --> depends of the style with go with
       
    }*/
  constructor(text, onClick) {
    this.text = text;
    this.onClick = onClick;
  }

  moveState(state) {
    this.game.setCurrentState(this.game.creditState);
  }
}
