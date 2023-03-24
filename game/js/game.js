//Load canvas when window is loaded
window.onload = function () {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  // Timing and frames per second
  var lastframe = 0;
  var fpstime = 0;
  var framecount = 0;
  var fps = 0;

  var images = [];


  var initialized = false;

  function loadImage(imagePath){
    var imageReady = false;
    var image = new Image();
    image.onload = function(){
        imageReady = true;
    }    
    image.src=imagePath;
  }

  function initialize(){
    backgroundImage = loadImage("images/background.png");

    canvas.addEventListener("keyDown", onKeyDown);

    canvas.addEventListener("mouseDown", onMouseDown);)

  }
};
