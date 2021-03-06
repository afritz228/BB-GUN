var bee;
var wasp = [];
var spider = [];
var dragonfly = [];
var Background;
var Lives;
var heart = 50;
var healthbar;
var score = 0;
// var flowerPower = 0;
var powerBar;
var scorebar;
var flower = [];
var bullet = [];
var dragonBullet = [];
var endcard;
var welcome;
var instruction;
var over;
var slide = 1;
var waspHealth = 2;
var spiderHealth = 5;
var dragonHealth = 3;
var paused = false;
var counter = 0;
var test;
//starts the game by creating the game area and spawning the bee
function startGame() {

    welcome = new component(700, 700,"welcome.png" , 0, 0, "background");
    instruction= new component(700, 700,"instruction.png" , 0, 0, "background");
    over = new component(700, 700,"over.png" , 0, 0, "background");
    bee = new component(80, 48, "anibee.gif", 300, 550, "image", heart);
    Lives = new component("30px", "Consolas", "black", 50, 40, "text");
    scorebar = new component("30px", "Consolas", "black", 450, 40, "text");
    Background = new component(1000, 1148,"background.png" , 0, 0, "background");
    healthbar = new component(heart, 20,"#fb6107" , 230, 20);
    // powerBar = new component("30px", "Consolas", "black", 450, 80, "text");
    endScore = new component("50px", "Consolas", "black", 400, 395, "text");
    test = new component("30px", "Consolas", "black", 400, 395, "text");


    myGameArea.start();
}
function pause(){
  if (!paused)
  {
      paused = true;
  } else if (paused)
  {
     paused= false;
  }
}
//Game area settings
var myGameArea = {
  //The game area is a html canvas (obviously)
    canvas : document.createElement("canvas"),
  //canvas settings
    start : function() {
        this.canvas.width = 680;
        this.canvas.height = 680;
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
        this.interval = setInterval(updateGameArea, 30);
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
function component(width, height, color, x, y, type, health) {
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
    this.health = health;
    this.update = function() {
      if (this.type == "text") {
       ctx.font = this.width + " " + this.height;
       ctx.fillStyle = color;
       ctx.fillText(this.text, this.x, this.y);
     }
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image,
                this.x, this.y, this.width, this.height);
            if (type == "background") {
                ctx.drawImage(this.image,
                this.x, this.y - this.height, this.width, this.height);
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
  counter += 1;
  if (slide < 4){
    welcome.update();
    if (myGameArea.keys && myGameArea.keys[13]) {slide += 1;}
  }
if(3 < slide && slide < 8){
  instruction.update();
  if (myGameArea.keys && myGameArea.keys[13]) {slide += 1;}
}

  if(slide == 8){

    var x, y;
    for (i = 0; i < wasp.length; i += 1) {
      //if you crash with the wasp you lose health
      for(n = 0; n < bullet.length; n += 1){

        if (wasp[i].crashWith(bullet[n])){

          bullet.splice(n, 1);
          wasp[i].health += -1;

        }
        if(wasp[i].health == 0){
          wasp.splice(i,1);
          score += 1;
        }
      }
        if (bee.crashWith(wasp[i])) {
            bee.health += -0.5;
            healthbar.width += -0.5;
// if you get to -1 health the game stops
            if (bee.health < 0) {

                slide = 10;
                return;
            }
        }
      }
      for (i = 0; i < spider.length; i += 1) {
        //if you crash with the wasp you lose health
        for(n = 0; n < bullet.length; n += 1){

          if (spider[i].crashWith(bullet[n])){

            bullet.splice(n, 1);
            spider[i].health += -1;

          }
          if(spider[i].health == 0){
            spider.splice(i,1);
            score += 5;
          }
        }
          if (bee.crashWith(spider[i])) {
              bee.health += -2;
              healthbar.width += -2;
  // if you get to -1 health the game stops
              if (bee.health < 0) {

                  slide = 10;
                  return;
              }
            }
        }
        for (i = 0; i < dragonfly.length; i += 1) {
          //if you crash with the wasp you lose health
          for(n = 0; n < bullet.length; n += 1){

            if (dragonfly[i].crashWith(bullet[n])){

              bullet.splice(n, 1);
              dragonfly[i].health += -1;

            }
            if(dragonfly[i].health == 0){
              dragonfly.splice(i,1);
              score += 2;
            }
          }
            if (bee.crashWith(dragonfly[i])) {
                bee.health += -1;
                healthbar.width += -1;
      // if you get to -1 health the game stops
                if (bee.health < 0) {

                    slide = 10;
                    return;
                }
            }
          }
          for (i = 0; i < dragonBullet.length; i += 1) {
            //if you crash with the wasp you lose health
            for(n = 0; n < bullet.length; n += 1){

              if (dragonBullet[i].crashWith(bullet[n])){

                bullet.splice(n, 1);
                dragonBullet.splice(i, 1);

              }
            }
              if (bee.crashWith(dragonBullet[i])) {
                  bee.health += -5;
                  healthbar.width += -5;
                  dragonBullet.splice(i,1);
        // if you get to -1 health the game stops
                  if (bee.health < 0) {

                      slide = 10;
                      return;
                  }
              }
            }
    for (i = 0; i < flower.length; i += 1){
      if (bee.crashWith(flower[i])) {
          bee.health += 2;
          healthbar.width += 2;
          flower.splice(i,1);
        }
    }

    if (!paused){
    myGameArea.clear();
    myGameArea.frameNo += 1;

    waspLV = Math.floor(myGameArea.frameNo / 30);
    waspFreq = Math.floor(Math.random() * (400 - waspLV) );

    flowerFreq = Math.floor(Math.random() * (301)+200);
    bulletFreq = 10;
    spiderFreq = Math.floor(Math.random() * (301)+100);
    dragonflyFreq = Math.floor(Math.random() * (301)+100);
    shoot = 50;
    if (waspLV > 350){
      waspFreq = Math.floor(Math.random() * (30) );
      bulletFreq = 8;
      flowerFreq = Math.floor(Math.random() * (101)+200);}
    //spawns little wasps at random intervals
    if (myGameArea.frameNo == 1 || everyinterval(waspFreq)) {
      p = Math.floor(Math.random() * (myGameArea.canvas.width-100)+100 );
      //location of wasp spawn(also random)
        x = myGameArea.canvas.width-p;
        y = myGameArea.canvas.height-myGameArea.canvas.height-100;
        //this is the wasp
        wasp.push(new component(90, 90, "aniwasp.gif", x, y, "image", waspHealth));

    }

    if (myGameArea.frameNo == 1 || everyinterval(flowerFreq)){
      p = Math.floor(Math.random() * (myGameArea.canvas.width-100));
        x = myGameArea.canvas.width-p;
        y = myGameArea.canvas.height-myGameArea.canvas.height-100;
    flower.push(new component(60, 60, "flower.png", x, y, "image"));
  }
  if (myGameArea.frameNo == 1 || everyinterval(spiderFreq)) {
    p = Math.floor(Math.random() * (myGameArea.canvas.width-100)+100 );
    //location of wasp spawn(also random)
      x = myGameArea.canvas.width-p;
      y = myGameArea.canvas.height-myGameArea.canvas.height-100;
      //this is the wasp
      spider.push(new component(85, 85, "anispider.gif", x, y, "image", spiderHealth));

  }

  if (myGameArea.frameNo == 1 || everyinterval(dragonflyFreq)) {
    p = Math.floor(Math.random() * (myGameArea.canvas.width-100)+100 );
    //location of wasp spawn(also random)
      x = myGameArea.canvas.width-p;
      y = myGameArea.canvas.height-myGameArea.canvas.height-100;
      //this is the wasp
      dragonfly.push(new component(90, 90, "anidragonfly.gif", x, y, "image", dragonHealth));

  }



    //sets the bee speed to  0. Don't delete this.
    bee.speedX = 0;
    bee.speedY = 0;
    //if you press keys the bee moves. If you delete, the bee doesn't move
   if(bee.x < 630){
  if (myGameArea.keys && myGameArea.keys[37]) {bee.speedX = -10; }}
 else{ bee.x = 629;}
 if(bee.x > -5){
  if (myGameArea.keys && myGameArea.keys[39]) {bee.speedX = 10; }}
 else{bee.x = -4;}
 if(bee.y < 630){
  if (myGameArea.keys && myGameArea.keys[38]) {bee.speedY = -10; }}
 else{bee.y = 629;}
 if(bee.y > 0){
  if (myGameArea.keys && myGameArea.keys[40]) {bee.speedY = 10; }}
 else{bee.y = 1}
  if (myGameArea.keys && myGameArea.keys[32]) {
    if (counter >= bulletFreq){
        x = bee.x+ 35;
        y = bee.y;
    bullet.push(new component(10, 30, "stinger.png", x, y, "image"));
    counter = 0;
  }
}

  Background.speedY = 2;
  Background.newPos();
  Background.update();
  for (i = 0; i < flower.length; i += 1) {
      flower[i].y += 2;
      flower[i].update();
      if (flower[i].y > 700){
        flower.splice(i, 1);
      }
  }
  for (i = 0; i < spider.length; i += 1) {
      spider[i].y += 5;
      if ((spider[i].x-bee.x)< -50) {
        spider[i].x += 6;
      }
      if(spider[i].x-bee.x> 50){spider[i].x += -6;}

      spider[i].update();
      if (spider[i].y > 700){
        spider.splice(i, 1);
      }
  }
    for (i = 0; i < wasp.length; i += 1) {
// wasp speed.
        wasp[i].y += 8;
        // if ((wasp[i].x-bee.x)< -50) {
        //   wasp[i].x += 3;
        // }
        // if(wasp[i].x-bee.x> 50){wasp[i].x += -3;}

        wasp[i].update();
        if (wasp[i].y > 700){
          wasp.splice(i, 1);
        }
    }
    for (i = 0; i < dragonfly.length; i += 1) {
// wasp speed.

        dragonfly[i].y += 6;
        dragonfly[i].update();
        if (myGameArea.frameNo == 1 || everyinterval(shoot)){
            x = dragonfly[i].x+ 35;
            y = dragonfly[i].y;
        dragonBullet.push(new component(10, 30, "stingwasp.png", x, y, "image"));
        }
        if (dragonfly[i].y > 700){
          dragonfly.splice(i, 1);
        }

    }

    for (i = 0; i < bullet.length; i += 1) {
        bullet[i].y += -15;
        bullet[i].update();
        if (bullet[i].y < -20){
          bullet.splice(i, 1);
        }
    }
    for (i = 0; i < dragonBullet.length; i += 1){
      dragonBullet[i].y += 10;
      dragonBullet[i].update();
      if (dragonBullet[i].y > 700){
        dragonBullet.splice(i, 1);
      }
    }

    healthbar.newPos();
    healthbar.update();
    Lives.text="HEALTH: " + bee.health;
    Lives.update();
    scorebar.text= "SCORE: " + score;
    scorebar.update();
    // test.text = waspLV+" " + waspFreq + " " +myGameArea.frameNo;
    // test.update();
    // powerBar.text = "Flower Power: "+ flowerPower;
    // powerBar.update();
    //updates the bee.
    bee.newPos();
    bee.update();
  }
  }
  if (slide == 10){
    //name = prompt("Enter your name", "Unknown Player");
    over.update();
    endScore.text = score;
    endScore.update();

    if (myGameArea.keys && myGameArea.keys[13]) {
      location.reload();

  }
  }

}
//I forgot what this does. I think it's important...
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
