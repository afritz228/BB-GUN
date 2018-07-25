...
 var cursors;
 var bank;
 //var shipTrail;
+var stingers;
+var fireButton;

 var ACCLERATION = 600;
 var DRAG = 400;
...
     //  The scrolling starfield background
     starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

+    //  Our bullet group
+    stingers = game.add.group();
+    bullets.enableBody = true;
+    bullets.physicsBodyType = Phaser.Physics.ARCADE;
+    bullets.createMultiple(30, 'bullet');
+    bullets.setAll('anchor.x', 0.5);
+    bullets.setAll('anchor.y', 1);
+    bullets.setAll('outOfBoundsKill', true);
+    bullets.setAll('checkWorldBounds', true);
+
     //  The hero!
     player = game.add.sprite(400, 500, 'ship');
     player.anchor.setTo(0.5, 0.5);
...

     //  And some controls to play the game with
     cursors = game.input.keyboard.createCursorKeys();
+    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

     //  Add an emitter for the ship's trail
     //shipTrail = game.add.emitter(player.x, player.y + 10, 400);
...
         player.body.acceleration.x = 0;
     }

+    //  Fire bullet
+    if (fireButton.isDown || game.input.activePointer.isDown) {
+        fireBullet();
+    }
+
     //  Move ship towards mouse pointer
     if (game.input.x < game.width - 20 &&
         game.input.x > 20 &&
...

 }

+function fireBullet() {
+    //  Grab the first bullet we can from the pool
+    var bullet = bullets.getFirstExists(false);
+
+    if (bullet)
+    {
+        //  And fire it
+        bullet.reset(player.x, player.y + 8);
+        bullet.body.velocity.y = -400;
+    }
+}
