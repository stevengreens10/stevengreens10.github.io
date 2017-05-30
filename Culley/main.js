var col = 20;
var row = 20;
var scl = 30;
var mx = 50;
var my = 50;

var ex;
var ey;

var nodes = [];
var index;
var current;

var player1;
var player2;

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    
    player1 = new Player(1);
    player2 = new Player(2);
    
    gen();
    player1.start();
    player2.start();
}

function draw(){
    background(51);
    grid();
    
    noStroke();
    fill(255,0,0);
    ellipse(ex,ey,20,20);
    
    var index = getIndex(getCoordX(ex),getCoordY(ey));
    current = (nodes[index]);
}

function grid(){
    for(var i = 0; i < nodes.length; i++){
        index = i;
        nodes[index].display();
    }
    for(i = 0; i < nodes.length; i++){
        index = i;
        nodes[index].stream();
    }
}

function gen(){
    for(var y = 0; y < col; y++){
        for(var x = 0; x < row; x++){
            nodes[getIndex(x,y)] = new Node(x,y,0);
            //nodes[getIndex(x,y)].state = 1;
        }
    }
}


function getCoordX(x){
    return (x - this.mx) / (this.scl);
}

function getCoordY(y){
    return (y - this.my) / (this.scl);
}

function getIndex(x,y){
    return x + y * col;
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

function mousePressed(){
    if(current.connectedTo(2)){
        current.state = 1;
        current.owners.push(2);
    }
}

function keyPressed(){
    if(key == " "){
        if(current.connectedTo(1)){
            current.state = 1;
            current.owners.push(1);
        }
    }
}

//Culleidoscope
