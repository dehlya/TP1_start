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
        const eventHandler = (e) => {
            if (e.code === keyPressed) {
                callback();
            }
        };

        if (!this.callbacks[keyPressed]) {
            this.callbacks[keyPressed] = {};
        }

        this.callbacks[keyPressed][type] = eventHandler;
        window.addEventListener(type, eventHandler);
    }


    // EXEMPLE D'UTILISATION

    //this.keyHandler.addCallback('KeyI', 'keypress', () => {
    //    this.toGameIntroState();
    //})

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
