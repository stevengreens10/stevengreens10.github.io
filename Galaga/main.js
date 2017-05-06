var ship;
var lasers = [];
var enemies = [];
var stars = [];

function setup(){
    createCanvas(800,600);
    //var canvas = createCanvas(windowWidth,windowHeight);
    //canvas.position(0,0);
    ship = new Ship();
    for(var i = 0; i < 10; i++){
        enemies.push(new Enemy(i*50+50,50,i % 2));
    }
    for(var i = 0; i < 10; i++){
        enemies.push(new Enemy(i*50+50,120,i % 2));
   }
    for(var i = 0; i < 10; i++){
        enemies.push(new Enemy(i*50+50,190,i % 2));
    }
}

/*function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    width = windowWidth;
    height = windowHeight;
}*/

function draw(){
    background(0);

    if(enemies.length == 0){
        fill(0,255,0);
        textSize(100);
        text("You win!", width/2-200,height/2);
    }else if(ship.hp <0){
        fill(255,0,0);
        textSize(100);
        text("You lose!", width/2-200,height/2);
    }

    var maxX = enemies[0].pos.x;
    var minX = enemies[0].pos.x;
    var rightI = 0;
    var leftI = 0;

    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].pos.x > maxX){
        maxX = enemies[i].pos.x;
        rightI = i;
      }
      if(enemies[i].pos.x < minX){
        minX = enemies[i].pos.x;
        leftI = i;
      }
    }

    print(rightI);

    for(let i = 0; i < enemies.length; i++){
       if(enemies[rightI].pos.x > width-10){
           enemies[i].move();
       }else if(enemies[leftI].pos.x < 10){
           enemies[i].move();
       }
        enemies[i].update();
    }

    if(stars.length <= 100){
        stars.push(new Star());
    }

    for( let i = 0; i < stars.length; i++){
        stars[i].update();

        if(stars[i].isOffScreen()){
            stars[i] = new Star();
        }
    }

    for(let i = lasers.length-1; i>= 0; i--){
        lasers[i].update();
        for(let j = enemies.length -1; j>=0; j--){
            if(lasers[i] && lasers[i].touching(enemies[j])){
                enemies.splice(j,1);
                lasers.splice(i,1);
            }
        }

        if(lasers[i] && lasers[i].isOffScreen()){
            lasers.splice(i,1);
        }


    }
    ship.update();

}

function keyPressed(){
    if(ship.hp >0){
        if(key == 'A' || keyCode == LEFT_ARROW){
            ship.vel.x = -ship.speed;
        }if(key == 'D' || keyCode == RIGHT_ARROW){
             ship.vel.x = ship.speed;
        }if(key == ' '){
            if(lasers.length <2){
                lasers.push(new Laser(ship.pos.x,ship.pos.y));
            }
        }
    }
}

function keyReleased(){
    if(key == 'A' || keyCode == LEFT_ARROW || key == 'D' || keyCode == RIGHT_ARROW){
        ship.vel.x = 0;
    }
}
