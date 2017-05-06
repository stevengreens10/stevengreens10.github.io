//Constants

var MAXSPAWN = 8000;
var MINSPAWN = 4000;
var MAXROCKV = 2.4;
var MINROCKV = 1.5;
var freqArray;
var shootSound;

//Variables
var asteroids;
var bullets;
var player;
var score = 0;
var timeout;
var shooting = false;
var cheating = false;
var cooldown = 0;
var despawnTimeout;

var powerup = undefined;

function preload(){
  try{
    shootSound = loadSound("./shoot.wav");
  }catch(e){
    print("Sound could not be loaded");
  }
}

function setup(){
    createCanvas(640,480);
    player = new Player();
    reset();

       freqArray = [];
        for(var i = 0; i < 100; i++){
          if(i < 20){
            freqArray[i] = 1;
          }else if(i >= 20 && i < 40){
            freqArray[i] = 2;
          }else if(i >= 40 && i < 60){
              freqArray[i] = 3;
          }else if(i >= 60 && i < 80){
            freqArray[i] = 4;
          }else if(i >= 80 && i < 100){
            freqArray[i] = 5;
          }
        }

}

function reset(){
  asteroids = [];
  bullets = [];
  powerup = undefined;
  player.powerup = 0;
  spawnAsteroid();
}

function spawnAsteroid(){
    if(document.hasFocus()){
        var chance = floor(random(1,5));
        var x = 0;
        var y = 0;
        if(chance == 1){
            x = -50;
            y = random(height);
        }else if(chance == 2){
            x = width+50;
            y = random(height);
        }else if(chance == 3){
            y = -50;
            x = random(width);
        }else{
            y = height+50;
            x = random(width);
        }
        asteroids.push(new Asteroid(x,y,30));
    }
    var time = map(score,0,30000,MAXSPAWN,MINSPAWN);
    if(time < MINSPAWN) time = MINSPAWN;
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(spawnAsteroid,time);
}

function draw(){
    background(51);
    if(player.lives > 0){
        player.update();

        if(shooting){
           if(cooldown % 15 == 0 || cheating || player.powerup == 3){
               player.shoot();
           }
        }

        cooldown++;

        /* POWERUPS */

        if(powerup && powerup.gotten == true) powerup = undefined;

        if(random(1000) < 1.5 && !powerup && player.powerup == 0){

          var id = freqArray[floor(random(freqArray.length))];
            powerup = new Powerup(random(width),random(height),id);
            if(despawnTimeout) clearTimeout(despawnTimeout);
            despawnTimeout = setTimeout(despawn,10000);
        }

        if(powerup){
            powerup.update();
            powerup.display();
        }



      //  for(let i = asteroids.length-1; i >= 0; i--){
          for(let i = 0; i < asteroids.length; i++){
            asteroids[i].update();

            if(asteroids[i].dead){
                asteroids.splice(i,1);
                i--;
            }
        }

        for(let i = bullets.length-1; i >= 0; i--){
            bullets[i].update();

            if(bullets[i].dead){
                bullets.splice(i,1);
            }
        }

        fill(255);
        textSize(20);
        text("Lives: " + player.lives,25,50);


        //score++;
    }else{
        push();
        textAlign(CENTER);
        fill(255,0,0);
        text("Game over.\nPress R to restart.",width/2,height/2);
        pop();
    }
    text("Lives: " + player.lives,25,50);
    text("Score: " + score,25,75);



}

function despawn(){
    powerup = undefined;
}

function keyPressed(){
    if(player.lives > 0){
        if(key == 'W' || keyCode == UP_ARROW){
            player.speed = -2;
        }else if(key == 'S' || keyCode == DOWN_ARROW){
            player.speed = 2;
        }else if(key == 'A' || keyCode == LEFT_ARROW){
            player.angleV=-0.08;
        }else if(key == 'D' || keyCode == RIGHT_ARROW){
            player.angleV = 0.08;
        }else if(key == ' '){
       //     if(cheating)
                shooting = true;
                cooldown = 15;
        }else if(keyCode == 191){
            cheating = !cheating;
            shooting = false;
        }
    }if(key == 'R'){
          reset();
          player = new Player();
          score = 0;
     }


}



function keyReleased(){
    if(key == 'W' || key == 'S' || keyCode == UP_ARROW || keyCode == DOWN_ARROW){
        player.speed = 0;
    }else if(key == 'A' || key == 'D' || keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW){
        player.angleV = 0;
    }else if(key == ' '){
        shooting = false;
    }
}
