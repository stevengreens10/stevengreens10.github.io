var col = 20;
var row = 20;
var scl = 30;
var mx = 50;
var my = 50;

var ex; //coords for ellipse that mouse is over
var ey;

var nodes = [];
var index;
var current; //is current node that is hovered over

var player1;
var player2;
var mode = 1; //defines whos turn it is
var opm = 2; //is the oppesite of mode

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
        if(mode == 1) nodes[index].display(1);
        if(mode == 2) nodes[index].display(2);
        nodes[index].display(3);
    }
    for(i = 0; i < nodes.length; i++){
        index = i;
        if(mode == 1) nodes[index].detect(1);
        if(mode == 2) nodes[index].detect(2);
        nodes[index].detect(3);
    }
    for(i = 0; i < nodes.length; i++){
        index = i;
        if(mode == 1) nodes[index].stream(1);
        if(mode == 2) nodes[index].stream(2);
    }
    for(i = 0; i < nodes.length; i++){
        index = i;
        nodes[index].stream(3);
    }
}

function gen(){
    for(var y = 0; y < col; y++){
        for(var x = 0; x < row; x++){
            nodes[getIndex(x,y)] = new Node(x,y,0);
            //nodes[getIndex(x,y)].state = 2;
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
    if(mode == 1){
        if(current.state == 2 && current.connectedTo(1)) current.state = 3;
        else if(current.connectedTo(1) && current.state == 0) current.state = 1;
    }

    if(mode == 2){
        if(current.state == 1 && current.connectedTo(2)){
            current.state = 3;
            print("1");
        }
        else if(current.connectedTo(2) && current.state == 0){
            current.state = 2;
            print("2");
        }
    }
}

function keyPressed(){
    if(key == " "){
        if(mode == 1){
            if(current.state == 2 && current.connectedTo(1)) current.state = 3;
            else if(current.connectedTo(1) && current.state == 0) current.state = 1;
        }
        if(mode == 2){
            if(current.state == 1 && current.connectedTo(2)){
                current.state = 3;
                print("1");
            }
            else if(current.connectedTo(2) && current.state == 0){
                current.state = 2;
                print("2");
            }
        }
    }
    if(key == "N"){
        if(mode == 1){
            mode = 2;
            opm = 1;
        }
        else if(mode == 2){
            mode = 1;
            opm = 2;
        }
    }
}
