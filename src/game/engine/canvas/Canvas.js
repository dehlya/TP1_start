export class Canvas {
    constructor() {
        this.canvas = document.getElementById('game');
        this.setContext();
    }
    setContext() {
        this.context = this.canvas.getContext('2d');
    }
    getContext() {
        return this.context;
    }
    getHeight() {
        return this.canvas.height;
    }
    getWidth() {
        return this.canvas.width;
    }
    setHeight(height) {
        this.canvas.height = height;
    }
    setWidth(width) {
        this.canvas.width = width;
    }
    setBackground(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.getWidth(), this.getHeight());
    }
    drawText(text) {
        this.getContext().fillStyle = "white";
        this.context.font = "48px serif";
        this.context.fillText(text, 10, 50);
    }
    cleanCanvas(state) {
        this.getContext().fillRect(0, 0, 1000, 600);
        this.setBackground(state.layout.background);
        this.getContext().fillStyle = "white";
    }
    mirrorImage(image, x = 0, y = 0, dw, dh, horizontal = false, vertical = false) {
        this.getContext().save();
        this.getContext().setTransform(horizontal ? -1 : 1, 0, 0, vertical ? -1 : 1, x + (horizontal ? 256 : 0), y + (vertical ? 64 : 0));
        this.getContext().drawImage(image, 0, 0, dw, dh);
        this.getContext().restore();
    }
}
