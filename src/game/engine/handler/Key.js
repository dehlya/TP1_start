export class Key {
    constructor(code, Handler) {
        this.code = code;
        this.Handler = Handler;
        this.isPressed = false;
        this.implementsListener();
    }
    implementsListener() {
        document.addEventListener('keydown', (event) => {
            if (event.code == this.code) {
                this.onPressed();
            }
        });
        document.addEventListener('keyup', (event) => {
            if (event.code == this.code) {
                this.onReleased();
            }
        });
    }
    onHold() {
    }
    onPressed() {
        this.Handler.push(this);
        console.log(this.code);
    }
    onReleased() {
        //this.keyHandler.activeKeys.splice(this.keyHandler.activeKeys.indexOf(this));
        console.log(this.code);
    }
}
