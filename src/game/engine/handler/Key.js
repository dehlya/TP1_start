export class Key {
    constructor(code, keyHandler) {
        this.code = code;
        this.keyHandler = keyHandler;
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
        this.keyHandler.activeKeys.push(this);
    }
    onReleased() {
        this.keyHandler.activeKeys.splice(this.keyHandler.activeKeys.indexOf(this));
    }
}
