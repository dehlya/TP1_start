export class HitboxCreator {
    constructor() {
        this.hitboxes = [];
    }
    defineLimits(imgPath){
        let img = new Image();
        img.src = imgPath;
        img.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
          
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let transparencyData = this.getTransparencyData(imageData);
            
            let hitbox = this.createHitboxFromImageData(imageData, transparencyData);
            console.log(hitbox);
            this.drawHitbox(ctx, hitbox);
            document.body.appendChild(canvas);

        }
    }
    getTransparencyData(imageData){
        const transparencyData = new Uint8ClampedArray(imageData.width * imageData.height);

        for (let i = 0; i < imageData.width * imageData.height; i++) {
        transparencyData[i] = imageData.data[i * 4 + 3]; // Assuming alpha channel is at index 3
        }

        return transparencyData;
    }
    createAll(){
        this.defineLimits('../../../../../ressources/game/ennemies/ennemy1_facing_back.png');
        this.defineLimits('../../../../../ressources/game/character/attack/attack_down_2.png');
    }

    // Recursive function to find hitbox boundaries
    findHitboxBounds(imageData, transparencyData, x, y, hitbox) {
        // Base case: if pixel is transparent or out of image bounds, return
        if (
            x < 0 ||
            y < 0 ||
            x >= imageData.width ||
            y >= imageData.height
        ) {
            return;
        }
    
        // Update hitbox boundaries
        if (x < hitbox.x) {
            hitbox.x = x;
        }
        if (y < hitbox.y) {
            hitbox.y = y;
        }
        if (x > hitbox.x + hitbox.width) {
            hitbox.width = x - hitbox.x;
        }
        if (y > hitbox.y + hitbox.height) {
            hitbox.height = y - hitbox.y;
        }
    
        // Recursive calls for adjacent pixels
        this.findHitboxBounds(imageData, transparencyData, x - 1, y, hitbox);  // Left
        this.findHitboxBounds(imageData, transparencyData, x + 1, y, hitbox);  // Right
        this.findHitboxBounds(imageData, transparencyData, x, y - 1, hitbox);  // Up
        this.findHitboxBounds(imageData, transparencyData, x, y + 1, hitbox);  // Down
    }

    // Function to create hitbox from image data and transparency information
    createHitboxFromImageData(imageData, transparencyData) {
        
        let hitbox = { vertices: [] };

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                const index = y * imageData.width + x;
                const alpha = transparencyData[index];

                if (alpha > 0) {
                    hitbox.vertices.push({ x, y });
                }
            }
        }

        return hitbox;


    }
    drawHitbox(ctx, hitbox) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(hitbox.vertices[0].x, hitbox.vertices[0].y);

        for (let i = 1; i < hitbox.vertices.length; i++) {
        ctx.lineTo(hitbox.vertices[i].x, hitbox.vertices[i].y);
        }

        ctx.closePath();
        ctx.stroke();
    }
}
