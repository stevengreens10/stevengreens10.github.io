var balls = [];
var selected = undefined;
var painted = undefined;
var turns = 0;
var numBalls = 4;
var ballSlider;


function setup(){
    createCanvas(640,480);
    
    resetBalls(); 
    createP("");
    //var stepButton = createButton("Next Step");
    ballSlider = createSlider(2,20,4);
    var resetButton = createButton("Reset");
    
   // stepButton.mousePressed(pickBalls);
   setInterval(pickBalls,200);
    resetButton.mousePressed(resetBalls);
 }

function draw(){
    background(51);
    strokeWeight(5);
    
    for(var i = 0; i < balls.length; i++){
        balls[i].display();
    }
    
    stroke(0);
    
    if(isAllSame()){
        textAlign(CENTER);
        fill(0,255,0);
        textSize(20);
        text("Done",width/2,height/2);
    }
    textSize(15);
    fill(0);
    strokeWeight(0);
    textAlign(LEFT);
    text("Turns: " + turns,25,50);
    text("# of balls: " + ballSlider.value(),25,70);
}

function resetBalls(){
    if(ballSlider) numBalls = ballSlider.value();
    balls = [];
    for(var j = 0; j < numBalls; j++){
        var x = map(j,0,numBalls-1,30,width-30);
        balls[j] = new Ball(j,x);
    }
    turns = 0;
}

function pickBalls(){
    if(isAllSame() == false){
        var index_1 = floor(random(0,numBalls));
        selected = balls[index_1];
        var index_2 = floor(random(0,numBalls));
        
        while(index_2 == index_1){
            index_2 = floor(random(0,numBalls));
        }
        
        painted = balls[index_2];
        
        balls[index_1].paint(balls[index_2]);
        turns++;
    }
}

function isAllSame(){
    var color = balls[0].color;
    
    for(var i  = 0; i < balls.length; i++){
        if(balls[i].color != color){
            return false;
        }
    }
    return true;
}