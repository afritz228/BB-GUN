var bee;
var wasp = [];
var Background;
//starts the game by creating the game area and spawning the bee
function startGame() {
    bee = new component(80, 48, "beeSprite1.png", 300, 550, "image");
    Background = new component(800, 700,"" , 0, 0, "background");

    myGameArea.start();
}
//Game area settings
var myGameArea = {
  //The game area is a html canvas (obviously)
    canvas : document.createElement("canvas"),
  //canvas settings
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  //this allows the program to detect keyboard hits
        window.addEventListener('keydown', function (e) {
    //basically if you hit a certain key (keyCode), you can make it do
    //things
    myGameArea.keys = (myGameArea.keys || []);
    myGameArea.keys[e.keyCode] = true;
  })
  //when the key isn't pressed it won't keep doing things
  window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
  })
  //fps settings.
      //this is for measuring purposes. No touch.
        this.frameNo = 0;
        //this codes how fast the screen refreshes
        this.interval = setInterval(updateGameArea, 20);
        },
  //clears the screen. If you delete this, the objects will trail
  //(aka don't touch)
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}
//defining component
function component(width, height, color, x, y, type) {
    this.type = type;
    //if the component is an image it'll be the input image
    if (type == "image" || type == "background"){
      this.image = new Image();
      this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image,
                this.x, this.y, this.width, this.height);
            if (type == "background") {
                ctx.drawImage(this.image,
                this.x + this.width, this.y, this.width, this.height);
            }
   } else {
     ctx.fillStyle = color;
     ctx.fillRect(this.x, this.y, this.width, this.height);
   }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.y == this.height) {
                this.y = 0;
            }
        }
    }
    //this codes for crashes. It'll return a boolean if you hit a thing
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}


function updateGameArea(p) {
    var x, y;
    for (i = 0; i < wasp.length; i += 1) {
      //if you crash with the wasp the game stops
        if (bee.crashWith(wasp[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    //makes a random number from 0 to 200
    freq = Math.floor(Math.random() * 200);
    //spawns little wasps at random intervals
    if (myGameArea.frameNo == 1 || everyinterval(freq)) {
      p = Math.floor(Math.random() * (myGameArea.canvas.width-100) );
      //location of wasp spawn(also random)
        x = myGameArea.canvas.width-p;
        y = myGameArea.canvas.height-myGameArea.canvas.height-100;
        //this is the wasp
        wasp.push(new component(75, 75, "waspSprite1.png", x, y, "image"));
    }
    //sets the bee speed to  0. Don't delete this.
    bee.speedX = 0;
    bee.speedY = 0;
    //if you press keys the bee moves. If you delete, the bee doesn't move
  if (myGameArea.keys && myGameArea.keys[37]) {bee.speedX = -10; }
  if (myGameArea.keys && myGameArea.keys[39]) {bee.speedX = 10; }
  if (myGameArea.keys && myGameArea.keys[38]) {bee.speedY = -10; }
  if (myGameArea.keys && myGameArea.keys[40]) {bee.speedY = 10; }
    for (i = 0; i < wasp.length; i += 1) {
// wasp speed.
        wasp[i].y += 7;
        wasp[i].update();
    }
    Background.speedY = 2;
    Background.newPos();
    Background.update();
    //updates the bee.
    bee.newPos();
    bee.update();
}
//I forgot what this does. I think it's important...
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
