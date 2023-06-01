export class HitboxCreator {
    constructor() {
        this.hitboxes = [];
    }
    defineLimits(){
        let img = new Image();
        //img.id = 'imgId';
        img.src = '../../../../../ressources/site/sketch/ennemy.png';
        img.onload = function(){
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
          
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let transparencyData = this.getTransparencyData(imageData);
            
            let hitbox = this.createHitboxFromImageData(imageData, transparencyData);
            console.log(hitbox);
        //     document.body.appendChild(img);
        //     let myImg = document.querySelector("#imgId");
        //     let realWidth = myImg.naturalWidth;
        //     let realHeight = myImg.naturalHeight;
        //     let imgCanvas = document.createElement('canvas');
        //     let imgCtx = imgCanvas.getContext('2d', {willReadFrequently: true});
        //     imgCtx.drawImage(img, 0, 0);
            
        //     console.log( realHeight, realWidth);
        //     for (let i = 0; i < realHeight; i++) {
        //         for (let j = 0; j < realWidth; j++) {
        //             let pixel = imgCtx.getImageData(i, j, 1, 1);
        //             let data = pixel.data;
        //             if(data[0] != 0 || data[1]!=0 || data[2]!=0){
        //                 pixel.data[0] = 255;
        //                 pixel.data[1] = 255;
        //                 pixel.data[2] = 255;
        //                 imgCtx.putImageData(pixel, i, j);
        //                 console.log(i, j)
        //             }
        //         }
        //     }
            
        //     document.body.appendChild(imgCanvas);

        }
    }
    getTransparencyData(imageData){
        let transparencyData = new Uint8ClampedArray(imageData.data.length);
        for (let i = 0; i < imageData.data.length; i++) {
            console.log(imageData.data[i]);
            transparencyData[i] = imageData.data[i];
        }
        return transparencyData;
    }
    createAll(){
        this.defineLimits();
    }

    // Recursive function to find hitbox boundaries
    findHitboxBounds(imageData, transparencyData, x, y, hitbox) {
        // Base case: if pixel is transparent or out of image bounds, return
        if (
            x < 0 ||
            y < 0 ||
            x >= imageData.width ||
            y >= imageData.height ||
            transparencyData[(x + y * imageData.width) * 4]
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
        findHitboxBounds(imageData, transparencyData, x - 1, y, hitbox);  // Left
        findHitboxBounds(imageData, transparencyData, x + 1, y, hitbox);  // Right
        findHitboxBounds(imageData, transparencyData, x, y - 1, hitbox);  // Up
        findHitboxBounds(imageData, transparencyData, x, y + 1, hitbox);  // Down
    }

    // Function to create hitbox from image data and transparency information
    createHitboxFromImageData(imageData, transparencyData) {
        let hitbox = {
            x: imageData.width,   // Initialize with maximum possible values
            y: imageData.height,  // Initialize with maximum possible values
            width: 0,             // Initialize with minimum possible value
            height: 0             // Initialize with minimum possible value
        };

        // Start recursive function from top-left corner of the image
        findHitboxBounds(imageData, transparencyData, 0, 0, hitbox);

        return hitbox;
    }
}
