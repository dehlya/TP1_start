export class KeyHandler {
    constructor() {
        this.callbacks = {};
    }

    logPressedKeys() {
        const pressedKeys = Object.entries(this.keys)
            .filter(([_, isPressed]) => isPressed)
            .map(([key]) => key);

        return pressedKeys.join(', ');
    }

    addCallback(keyPressed, type, callback) {
        let isKeyPressed = false;

        const keyDownHandler = (event) => {
            if (!isKeyPressed && event.code === keyPressed) {
                isKeyPressed = true;
                callback();
            }
        };

        const keyUpHandler = (event) => {
            if (event.code === keyPressed) {
                isKeyPressed = false;
            }
        };

        this.callbacks[keyPressed] = {
            keydown: keyDownHandler,
            keyup: keyUpHandler
        };

        window.addEventListener(type, keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);
    }

    removeCallback(keyPressed, type) {
        const eventHandler = this.callbacks[keyPressed] && this.callbacks[keyPressed][type];
        if (eventHandler) {
            window.removeEventListener(type, eventHandler);
            delete this.callbacks[keyPressed][type];
        }
    }

    removeAllCallbacks() {
        console.log(this.callbacks);
        for (let keyPressed in this.callbacks) {
            for (let type in this.callbacks[keyPressed]) {
                this.removeCallback(keyPressed, type);
            }
        }
    }

}
