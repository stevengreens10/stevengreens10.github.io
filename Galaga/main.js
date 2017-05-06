var ship;
var lasers = [];
var enemies = [];
var stars = [];

function setup(){
    createCanvas(800,600);
    //var canvas = createCanvas(windowWidth,windowHeight);
    //canvas.position(0,0);
    ship = new Ship();
    for(var i = 0; i < 15; i++){
        enemies.push(new Enemy(i*40+40,40,i % 2));
    }
    /*for(var i = 0; i < 10; i++){
        var id = (i+1) % 2;
        enemies.push(new Enemy(i*50+50,120,id));
   }
    for(var i = 0; i < 10; i++){
        enemies.push(new Enemy(i*50+50,190,i % 2));
    }*/
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
    }
    if(ship.hp <0){
        fill(255,0,0);
        textSize(100);
        text("You lose!", width/2-200,height/2);
    }
    
    
    for(let i = 0; i < enemies.length; i++){
       if(enemies[enemies.length-1].pos.x > width-10){
           enemies[i].move();
       }else if(enemies[0].pos.x < 10){
           enemies[i].move();
       }
        enemies[i].update();
        fill(255);
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