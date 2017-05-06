var horses;
var won = false;
var winners = [];
var winnerP;

function setup(){
    createCanvas(640,480);
    reset();
    
    winnerP = createP("");
}

function reset(){
    won = false;
    horses = [];
    
    for(var i = 1; i <= 20; i++){
        horses.push(new Horse(i));
    }
}

function draw(){
    background(51);
    
    line(20,0,20,height);
    line(width-20,0,width-20,height);
    
    for(var i  = 0; i < horses.length; i++){
        var horse = horses[i];
        if(frameCount % 2 == 0 && won == false){
            horse.update();
        }
        horse.display();
    }
}