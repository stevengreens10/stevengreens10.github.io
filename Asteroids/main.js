//Constants

var MAXSPAWN = 8000;
var MINSPAWN = 4000;
var MAXROCKV = 2.4;
var MINROCKV = 1.5;
var MAXSCORE = 30000;
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

var money = 0;
var coincounter = 0;
var difficulty = 1;
var incDuration = false;

var ships = [true,false,false,false];

function setup(){
    var canvas = createCanvas(640,480);
    canvas.parent("game");
   freqArray = [];
    for(var i = 0; i < powerupList.length; i++){
        freqArray.push(powerupList[i]);
    }
    
    loadData();
    handleButtons();
}

function handleButtons(){
    
    //MAIN MENU
    makeButton(new Button("Start",width/2,200,250,30,0), function(){
        state = 4;
    });
    makeButton(new Button("Shop",width/2,250,250,30,0), function(){
        state = 3;
    });
    makeButton(new Button("Options", width/2, 300, 250, 30, 0), function(){
       state = 5; 
    });
    
    //PAUSE SCREEN
    makeButton(new Button("Continue",width/2,200,250,30,2), function(){
        state = 1;
    });
    makeButton(new Button("Return to menu",width/2,250,250,30,2), function(){
        gameOver();
    });
    
    //SHOP
    makeButton(new Button("Buy Tank - $50", width/2, 200, 250, 30, 3), function(){
        if(money >= 50){
            money-=50;
            ships[1] = true;
            this.disabled = true;
        }
    }, function(){
        if(ships[1]){
            this.disabled = true;
        }else{
            this.disabled = false;
        }
        this.display();
    });
    
    makeButton(new Button("Buy Scout - $100", width/2, 250, 250, 30, 3), function(){
        if(money >= 100){
            money-=100;
            ships[2] = true;
            this.disabled = true;
        }
    }, function(){
        if(ships[2]){
          this.disabled = true;  
        }else{
            this.disabled = false;
        }
        this.display();
    });
    
    makeButton(new Button("Powerup duration increase - $75", width/2, 300, 250, 30, 3), function(){
        if(money >= 75){
            money-=75;
            this.disabled = true;
            incDuration = true;
            
        }
    }, function(){
        if(incDuration){
            this.disabled = true;
        }else{
            this.disabled = false;
        }
        
        this.display();
    });
    
    makeButton(new Button("Return to menu",width/2,350,250,30,3), function(){
        state = 0;
    });
    
    
    //SHIP SELECTION
    makeButton(new Button("Normal", width/2-200, height/2, 100, 100, 4), function(){
        reset(0);
    }, function(){
        this.textSize = 30;
        this.display();
    });
    
    makeButton(new Button("Tank", width/2, height/2, 100, 100, 4), function(){
        reset(1);
    }, function(){
        if(!ships[1]){
            this.disabled = true;
        }else{
            this.disabled = false;
        }
        this.textSize = 30;
        this.display();
    });
    
    makeButton(new Button("Scout", width/2+200, height/2, 100, 100, 4), function(){
        reset(2);
    }, function(){
        if(!ships[2]){ 
            this.disabled = true;
        }else{
            this.disabled = false;
        }
        this.textSize = 30;
        this.display();
    });
    
    makeButton(new Button("Return to menu", width/2,height/2+100,250,30,4), function(){
        state = 0;
    });
    
    
    //OPTIONS MENU
    makeButton(new Button("Reset Data",130,height-38,100,30,5), resetData);
    makeButton(new Button("Return to menu", width/2,height/2+125,250,30,5), function(){
        state = 0;
    });
    
    makeButton(new Button("Easy",width/2,200,250,30,5), function(){
        difficulty = 0;
    }, function(){
        if(difficulty == 0){
            this.disabled = true;  
        }else{
            this.disabled = false;
        }
        this.display();
    });
    makeButton(new Button("Medium",width/2,250,250,30,5), function(){
        difficulty = 1;  
    }, function(){
        if(difficulty == 1){
            this.disabled = true;  
        }else{
            this.disabled = false;
        }
        this.display();
    });
    makeButton(new Button("Hard", width/2, 300, 250, 30, 5), function(){
        difficulty = 2; 
    }, function(){
        if(difficulty == 2){
            this.disabled = true;  
        }else{
            this.disabled = false;
        }
        this.display();
    });
    
    
}

function makeButton(button, clickFunc, updateFunc){
    button.click = clickFunc;
    if(updateFunc){
        button.update = updateFunc;
        button.update();
    }
    buttons.push(button);
}

function reset(id){
  if(key == 'R') incDuration = false;
  asteroids = [];
  bullets = [];
  powerups = [];
  score = 0;
  coincounter = 0;
  player = new Player(id);
  state = 1;
  spawnAsteroid();
  
  if(difficulty == 0){
      MAXSCORE = 40000;
      MAXSPAWN = 9500;
      MINSPAWN = 4400;
      MAXROCKV = 2.2;
      MINROCKV = 1.1;
  }else if(difficulty == 1){
      MAXSCORE = 30000;
      MAXSPAWN = 8000;
      MINSPAWN = 4000;
      MAXROCKV = 2.4;
      MINROCKV = 1.5;
  }else{
      MAXSCORE = 25000;
      MAXSPAWN = 6500;
      MINSPAWN = 3000;
      MAXROCKV = 3.5;
      MINROCKV = 2.1;
  }
}

function gameOver(){
  state = 0;
  if(score > high_score){
    high_score = score;
  } 
  
  incDuration = false;
}

function spawnAsteroid(){
    if(document.hasFocus() && state == 1){
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
        if(random(100) < 2){
            r = 7.5;
        }else if(random(100) < 10){
            r = 15;
        }else{
            r = 30;
        }
        asteroids.push(new Asteroid(x,y,r));
    }
    var time = map(score,0,MAXSCORE,MAXSPAWN,MINSPAWN);
    if(time < MINSPAWN) time = MINSPAWN;
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(spawnAsteroid,time);
}

function draw(){
    background(51);

    if(frameCount % 300 == 0){
        saveData();
    }

    if(state == 1){
      ///if(player.lives > 0){
        player.update();

        if(shooting){
           if((cooldown % player.shootInterval == 0 || cheating || player.hasPowerup(3)) && !player.hasPowerup(7)){
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
            if(!powerupExists(id) && !player.hasPowerup(id) && document.hasFocus()) spawnPowerup(id);
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
      textAlign(CENTER);
      text("Lives: " + player.lives,70,50);
      text("Score: " + score,70,75);
      text("Money: $" + money, width-70,50);


      if(document.hasFocus() == false){
          state = 2;
      }
    }else if(state == 0){ //MAIN MENU
      push();
      noFill();
      stroke(255);
      textAlign(CENTER);
      textSize(50);
      text("ASTEROIDS",width/2,100);
      for(let b = 0; b < buttons.length; b++){
        if(buttons[b].state == 0) buttons[b].update();
      }

      textSize(25);
      fill(255);
      noStroke();
      text("High score: " + high_score, width/2,450);

      pop();
    }else if(state == 2){ //PAUSE
        push();
        noFill();
        stroke(255);
        textAlign(CENTER);
        textSize(50);
        text("PAUSED",width/2,100);
        for(let b = 0; b < buttons.length; b++){
          if(buttons[b].state == state) buttons[b].update();
        }
        
        pop();
           
    }else if(state == 3){ // SHOP
        push();
        noFill();
        stroke(255);
        textAlign(CENTER);
        textSize(50);
        text("SHOP",width/2,100);
        for(let b = 0; b < buttons.length; b++){
          if(buttons[b].state == state) buttons[b].update();
        }
        textSize(20);
        fill(255);
        noStroke();
        text("Money: $" + money, width-70,50);
        
        pop();
           
    }else if(state == 4){ //SELECTION
        push();
        noFill();
        stroke(255);
        textAlign(CENTER);
        textSize(50);
        text("Select Ship",width/2,100);
        for(let b = 0; b < buttons.length; b++){
          if(buttons[b].state == state) buttons[b].update();
        }
        textSize(20);
        fill(255);
        
        pop();   
    }else if(state == 5){
        push();
        noFill();
        stroke(255);
        textAlign(CENTER);
        textSize(50);
        text("OPTIONS",width/2,100);
        for(let b = 0; b < buttons.length; b++){
          if(buttons[b].state == state) buttons[b].update();
        }
        textSize(20);
        fill(255);
        
        pop();   
    }


}

function despawn(powerup){
    for(var i = 0; i < powerups.length; i++){
        if(powerups[i] == powerup){
            powerups.splice(i,1);
            return;
        }
    }
}

function spawnPowerup(id){
    powerups.push(new Powerup(random(width),random(height),id));
    setTimeout(despawn,10000,powerups[powerups.length-1]);
}

function mousePressed(){
    for(var i = 0; i < buttons.length; i++){
      var button = buttons[i];
    
      if(button.isHoveringOver() && button.state == state && !button.disabled){
        button.click();
        return;
      }
    }
}

function keyPressed(){
    if(state == 1 && player.lives > 0){
        if(key == 'W' || keyCode == UP_ARROW){
            player.speed = -player.maxSpeed;
            player.drift = false;
        }else if(key == 'S' || keyCode == DOWN_ARROW){
            player.speed = player.maxSpeed;
            player.drift = false;
        }else if(key == 'A' || keyCode == LEFT_ARROW){
            player.angleV=-0.08;
        }else if(key == 'D' || keyCode == RIGHT_ARROW){
            player.angleV = 0.08;
        }else if(key == ' '){
       //     if(cheating)
                shooting = true;
                cooldown = player.shootInterval;
        }else if(keyCode == 191){
            cheating = !cheating;
            shooting = false;
            score = 0;
        }
    }if(key == 'R'){
          if(state == 1) reset(player.id);
     }if(keyCode == 27){
        if(state == 1){
            state = 2;
        }else if(state == 2){
            state = 1;
        }
     }

    if(key == 'W' || keyCode == UP_ARROW || key == 'S' || keyCode == DOWN_ARROW || key == 'A' || keyCode == LEFT_ARROW || key == 'D' || keyCode == RIGHT_ARROW || key == ' ')
        return false;

}

function keyReleased(){
    if(state == 1){
        if(key == 'W' || key == 'S' || keyCode == UP_ARROW || keyCode == DOWN_ARROW){
            player.speed = 0;
            //player.drift = true;
        }else if(key == 'A' || key == 'D' || keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW){
            player.angleV = 0;
        }else if(key == ' '){
            shooting = false;
        }
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

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function addScore(s){
    
    var mult = 1;
    
    if(difficulty == 0){
        mult = (3/4);
    }else if(difficulty == 2){
        mult = 1.5;
    }
    
    var maximum = round(1000 / mult);
    
    s*=mult;
    if(!cheating){
        score += round(s);
        var initial = 0;
        if(coincounter + s >= maximum){
            initial = (coincounter + s) - maximum;
        }
        coincounter += s;
        
        if(coincounter >= maximum){
            addMoney(1);
            coincounter = initial;
        }
    }
}

function addMoney(m){
    money += m;
    money = round(money);
}

function saveData(){
    document.cookie = "highscore=" + high_score;
    document.cookie = "money=" + money;
    document.cookie = "tank="+ships[1];
    document.cookie = "scout="+ships[2];
    document.cookie = "expires=Thu, 01 Jan 2018 00:00:00 UTC";
}

function loadData(){
    if(getCookie("highscore") == ""){
        high_score = 0;
    }else{
        high_score = getCookie("highscore");
    }
    
    if(getCookie("money") == ""){
        money = 0;
    }else{
        money = getCookie("money");
        money/=1;
    }
    
    if(getCookie("tank") == "true") ships[1] = true;
    if(getCookie("scout") == "true") ships[2] = true;
}

function resetData(){
    high_score = 0;
    money = 0;
    ships[1] = false;
    ships[2] = false;
    document.cookie = "highscore=" + 0;
    document.cookie = "money=" + 0;
    document.cookie = "tank="+ false;
    document.cookie = "scout="+false;
}
