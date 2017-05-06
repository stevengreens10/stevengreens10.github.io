var cols;
var rows;
var scl;
var i =0;
var cells = [];
var paused =true;
var debug =false;
var speed =8;
var canvas;

function setup(){
  canvas = createCanvas(641,481);
  frameRate(speed);
  scl = 20;
  cols = floor(width/scl);
  rows = floor(height/scl);

  for(x = 0; x < cols; x++){
    for(y = 0; y < rows; y++){
      var state = random(100)<0;
      var index = x + y * cols;
      cells[index] = new Cell(state,x,y);
    }
  }
}

function draw(){
  frameRate(speed);
  if(debug){
    stroke(0);
  }else{
    noStroke();
  }
  grid();
  noStroke();
  textSize(20);
  if(paused){
    fill(255,0,0);
    text("Paused",width-110,30);
  }else{
    fill(0,255,0);
    text("Unpaused",width-110,30);
  }
  fill(0,0,255);
  text("Speed: " + speed, width-110,50);
}

function grid(){
  var next = [];
  for(x = 0; x < cols; x++){
    for(y = 0; y < rows; y++){
      var index = x+y*cols;
      var c = cells[index];
      c.display();
      var alive = getAlive(x,y);

      var nextState = c.state;
      if(!paused){
        if(alive == 3 & c.state == false){
          nextState = true;
        }
        if((alive < 2 || alive > 3) && c.state == true){
          nextState = false;
        }
      }
      next[index] = new Cell(nextState,x,y);
    }
  }
  cells  =next;
}

function getAlive(x,y){
  var count = 0;
  if(x != 0){
    if(y != rows-1){
      var index = (x-1) + (y+1) * cols;
      if(cells[index].state == true){
        count++;
      }
    }
    if(y != 0){
      var index = (x-1) + (y-1) * cols;
      if(cells[index].state == true){
        count++;
      }
    }
    var index = (x-1) + (y) * cols;
    if(cells[index].state == true){
      count++;
    }
  }

  if(y != rows-1){
    var index = (x) + (y+1) * cols;
    if(cells[index].state == true){
      count++;
    }
  }
  if(y != 0){
    var index = (x) + (y-1) * cols;
    if(cells[index].state == true){
      count++;
    }
  }

  if(x!= cols-1){
    if(y != rows-1){
      var index = (x+1) + (y+1) * cols;
      if(cells[index].state == true){
        count++;
      }
    }
    if(y!=0){
      var index = (x+1) + (y-1) * cols;
      if(cells[index].state == true){
        count++;
      }
    }
    var index = (x+1) + (y) * cols;
    if(cells[index].state == true){
      count++;
    }
  }
  return count;
}

function keyPressed(){
  if(key == 'R'){
    for(x = 0; x < cols; x++){
      for(y = 0; y < rows; y++){
        var state = random(100) < 30;
        var index = x + y * cols;
        cells[index] = new Cell(state,x,y);
      }
    }
  }else if(key == 'C'){
    for(x = 0; x < cols; x++){
      for(y = 0; y < rows; y++){
        var state = false;
        var index = x + y * cols;
        cells[index] = new Cell(state,x,y);
      }
    }
  }else if(key =='D'){
    debug=!debug;
  }else if(keyCode == 38){
    speed++;
    if(speed >20){ speed =20;}
  }else if(keyCode == 40){
    speed--;
    if(speed<1){ speed = 1;}
  }else{
    paused = !paused;
  }
}

function mousePressed(){
  if(mouseX >0 && mouseX < width && mouseY < height && mouseY > 0){
    var x = int(mouseX/scl);
    var y = int(mouseY/scl);
    var index = x + y * cols;
    cells[index].state = !cells[index].state;
  }
}
