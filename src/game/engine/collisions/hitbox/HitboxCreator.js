export class HitboxCreator {
    constructor() {
        this.hitboxes = [];
    }
    defineLimits(imgPath){
        let img = new Image();
        //img.id = 'imgId';
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
        let transparencyData ;
        transparencyData = new Uint8ClampedArray(imageData.data.length);
        console.log(imageData.data);
        for (let i = 0; i < imageData.data.length; i++) {
        }
        return transparencyData;
    }
    createAll(){
        this.defineLimits('../../../../../ressources/site/sketch/ennemy.png');
    }

    // Recursive function to find hitbox boundaries
    findHitboxBounds(imageData, transparencyData, x, y, hitbox) {
        // Base case: if pixel is transparent or out of image bounds, return
        if (
            x < 0 ||
            y < 0 ||
            x >= imageData.width ||
            y >= imageData.height ||
            transparencyData[(x + y * imageData.width) * 4 + 3] === 0
        ) {
            return;
        }
    
        // Update hitbox boundaries
        if (x < hitbox.x) {
            hitbox.width += hitbox.x - x;
            hitbox.x = x;
        }
        if (y < hitbox.y) {
            hitbox.height += hitbox.y - y;
            hitbox.y = y;
        }
        if (x > hitbox.x + hitbox.width) {
            hitbox.width = x - hitbox.x + 1;
        }
        if (y > hitbox.y + hitbox.height) {
            hitbox.height = y - hitbox.y + 1
        }
    
        // Recursive calls for adjacent pixels
        this.findHitboxBounds(imageData, transparencyData, x - 1, y, hitbox);
        this.findHitboxBounds(imageData, transparencyData, x + 1, y, hitbox);
        this.findHitboxBounds(imageData, transparencyData, x, y - 1, hitbox);
        this.findHitboxBounds(imageData, transparencyData, x, y + 1, hitbox);
    }

    // Function to create hitbox from image data and transparency information
    createHitboxFromImageData(imageData, transparencyData) {
        let hitbox = {
            x: imageData.width,   // Initialize with maximum possible values
            y: imageData.height,  // Initialize with maximum possible values
            width: 0,             // Initialize with minimum possible value
            height: 0             // Initialize with minimum possible value
        };
        // function for non recusive method
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
              const pixelIndex = (x + y * imageData.width) * 4;
              const isTransparent = transparencyData[pixelIndex] === 0;
        
              if (!isTransparent) {
                hitbox.x = Math.min(hitbox.x, x);
                hitbox.y = Math.min(hitbox.y, y);
                hitbox.width = Math.max(hitbox.width, x - hitbox.x + 1);
                hitbox.height = Math.max(hitbox.height, y - hitbox.y + 1);
              }
            }
        }

        // Start recursive function from top-left corner of the image
        //this.findHitboxBounds(imageData, transparencyData, 0, 0, hitbox);

        return hitbox;
    }
}
