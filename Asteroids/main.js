//Constants

var MAXSPAWN = 8000;
var MINSPAWN = 4000;
var MAXROCKV = 2.4;
var MINROCKV = 1.5;
var freqArray;
var powerupList = [1,2,3,4,5,6,7,8];


//Variables
var asteroids;
var bullets;
var player;
var score = 0;
var high_score = 0;
var timeout;
var shooting = false;
var cheating = false;
var cooldown = 0;

var powerups = [];
var buttons = [];

var state = 0;

function setup(){
    var canvas = createCanvas(640,480);
    canvas.parent("game");
   freqArray = [];
    for(var i = 0; i < powerupList.length; i++){
        freqArray.push(powerupList[i]);
    }

    buttons.push(new Button("Start",width/2,200,250,30));
    buttons.push(new Button("Shop",width/2,250,250,30));

}

function reset(){
  asteroids = [];
  bullets = [];
  powerups = [];
  score = 0;
  player = new Player();
  spawnAsteroid();
  state = 1;

}

function gameOver(){
  state = 0;
  if(score > high_score) high_score = score;
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
        var r;
        if(random(100) < 88){
            r = 30;
        }else{
            if(random(100) < 10){
                r = 15;
            }else{
                r = 7.5;
            }
        }
        asteroids.push(new Asteroid(x,y,r));
    }
    var time = map(score,0,30000,MAXSPAWN,MINSPAWN);
    if(time < MINSPAWN) time = MINSPAWN;
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(spawnAsteroid,time);
}

function draw(){
    background(51);

    if(state == 1){
      ///if(player.lives > 0){
        player.update();

        if(shooting){
           if((cooldown % 15 == 0 || cheating || player.hasPowerup(3)) && !player.hasPowerup(7)){
               player.shoot();
           }
        }

        cooldown++;

        /* POWERUPS */


        if(random(1000) < 1.5){
            var id = freqArray[floor(random(freqArray.length))];
            if(powerups.length != powerupList.length){
              while(powerupExists(id)){
                id = freqArray[floor(random(freqArray.length))];
              }
            }
            if(!powerupExists(id) && !player.hasPowerup(id)) spawnPowerup(id);
        }

        for(var p = powerups.length-1; p >= 0; p--){
            var powerup = powerups[p];

            if(powerup){
                powerup.update();

                if(powerup.gotten){
                    powerups.splice(p,1);
                }
            }
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
      /*}else{
          push();
          textAlign(CENTER);
          fill(255,0,0);
          text("Game over.\nPress R to restart.",width/2,height/2);
          pop();
      }*/
      text("Lives: " + player.lives,25,50);
      text("Score: " + score,25,75);


    }else if(state == 0){ //MAIN MENU
      push();
      noFill();
      stroke(255);
      textAlign(CENTER);
      textSize(50);
      text("ASTEROIDS",width/2,100);
      for(let b = 0; b < buttons.length; b++){
        buttons[b].update();
      }

      textSize(25);
      fill(255);
      noStroke();
      text("High score: " + high_score, width/2,450);

      pop();
    }


}

function despawn(id){
    for(var i = 0; i < powerups.length; i++){
        if(powerups[i].id == id){
            powerups.splice(i,1);
            return;
        }
    }
}

function spawnPowerup(id){
    if(document.hasFocus()){
        powerups.push(new Powerup(random(width),random(height),id));
        setTimeout(despawn,10000,id);
    }
}

function mousePressed(){

  if(state != 1){
    for(var i = 0; i < buttons.length; i++){
      var button = buttons[i];

      if(button.isHoveringOver()){
        if(button.string == "Start"){
          reset();
        }
      }
    }
  }
}

function keyPressed(){
    if(player.lives > 0){
        if(key == 'W' || keyCode == UP_ARROW){
            player.speed = -player.maxSpeed;
        }else if(key == 'S' || keyCode == DOWN_ARROW){
            player.speed = player.maxSpeed;
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
            score = 0;
        }
    }if(key == 'R'){
          if(state == 1) reset();
     }if(keyCode == 27){
        if(state == 1) state = 0;
     }

    if(key == 'W' || keyCode == UP_ARROW || key == 'S' || keyCode == DOWN_ARROW || key == 'A' || keyCode == LEFT_ARROW || key == 'D' || keyCode == RIGHT_ARROW || key == ' ')
        return false;

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

function powerupExists(id){
    for(var i = 0; i < powerups.length; i++){
        if(powerups[i].id == id){
            return true;
        }
    }

    return false;
}
