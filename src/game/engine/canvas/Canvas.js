export class Canvas {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.setContext();
        document.getElementById('canvas').appendChild(this.canvas);
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
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawText(text) {
        this.getContext().fillStyle = "white";
        this.context.font = "48px serif";
        this.context.fillText(text, 10, 50);
    }
    cleanCanvas(state) {
        this.context.restore();
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //this.setBackground(state.layout.background);
        //this.context.save();
    }
    mirrorImage(image, x = 0, y = 0, dw, dh, horizontal = false, vertical = false) {
        //this.getContext().save();
        this.getContext().setTransform(horizontal ? -1 : 1, 0, 0, vertical ? -1 : 1, x + (horizontal ? 256 : 0), y + (vertical ? 64 : 0));
        this.getContext().drawImage(image, 0, 0, dw, dh);
        //this.getContext().restore();
    }
    
}
