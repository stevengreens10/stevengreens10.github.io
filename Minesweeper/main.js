var cells = [];
var cols;
var rows;
var scl;
var dead = false;
var cycles = 0;
var count =0;

function setup(){
    cols = 24;
    rows = 24;
    scl = 25;

    createCanvas(cols*scl+1,rows*scl+1);

    generate();

}

function draw(){
    drawGrid();
    fill(0);
    textSize(15);
    if(dead){
        text("Press a key to reset",20,height-10);
    }else{
        text("Press a key to place a flag",20,height-10);
    }
}

function drawGrid(){
    for(x = 0; x < cols; x++){
        for(y = 0; y < rows; y++){
            var index = x+y * cols;
            cells[index].display();
            var alive = getAlive(x,y);
           if(cells[index].state == 2){
                fill(0);
                if(alive >0){
                    textSize(scl/2 + scl/4);
                    text(alive,x*scl+(scl * 1/3),y*scl+(scl * 3/4));
                }
           }
        }
    }
}

function generate(){
    clicks = 0;
    for(x = 0; x < cols; x++){
        for(y = 0; y < rows; y++){
            var index = x + y * cols;
            var state =0;
            if(random(100) < 17.18){
                state = 1;
            }
            cells[index] = new Cell(state,x,y);
        }
    }
}

function mousePressed(){


    if(!dead){
        if(mouseX >0 && mouseX < width && mouseY < height && mouseY > 0){
            var x = int(mouseX/scl);
            var y = int(mouseY/scl);
            var index = x + y * cols;

            checkNeighbors(x,y);

            if(cells[index].flagged == false){
                if(cells[index].state == 0){
                    cells[index].state = 2;
                }else if(cells[index].state == 1){
                    cells[index].state = 3;
                }else if(cells[index].state == 2){
                    if(getFlagged(x,y) == getAlive(x,y)){
                        removeUnflagged(x,y);
                    }
                }

                if(clicks == 0){
                    for(var i = x-1; i < x+2; i++){
                      for(var j = y-1; j < y + 2; j++){
                        var cell = cells[getIndex(i,j)];
                        if(cell && i < cols && i >= 0 && j < rows && j >= 0){
                          if(cell.state == 1) cell.state = 0;
                          cell.flagged = false;
                        }
                      }
                    }

                    for(var i = x-1; i < x+2; i++){
                      for(var j = y-1; j < y + 2; j++){
                        var cell = cells[getIndex(i,j)];
                        if(cell && i < cols && i >= 0 && j < rows && j >= 0){
                          checkNeighbors(i,j);
                        }
                      }
                    }


                }
                clicks++;
            }
        }
    }
}

function getIndex(x,y){
  return x + y * cols;
}

function keyPressed(){
    if(dead){
        dead = false;
        generate();
    }else{
        if(mouseX >0 && mouseX < width && mouseY < height && mouseY > 0){
            var x = int(mouseX/scl);
            var y  = int(mouseY/scl);
            var index = x + y *cols;
            if(cells[index].state == 0 || cells[index].state == 1){
              cells[index].flagged = !cells[index].flagged;
            }


        }
    }
}

function getAlive(x,y){
    var count = 0;

    for(var i = x-1; i < x+2; i++){
      for(var j = y-1; j < y + 2; j++){
        var cell = cells[getIndex(i,j)];
        if(cell && (cell.state == 1 || cell.state == 3) && i < cols && i >= 0 && j < rows && j >= 0){
          count++;
        }
      }
    }
      return count;
}

function getFlagged(x,y){
    var count = 0;
    for(var i = x-1; i < x+2; i++){
      for(var j = y-1; j < y + 2; j++){
        var cell = cells[getIndex(i,j)];
        if(cell && (cell.flagged) && i < cols && i >= 0 && j < rows && j >= 0){
          count++;
        }
      }
    }
    return count;
}

function removeUnflagged(x,y){

  for(var i = x-1; i < x+2; i++){
    for(var j = y-1; j < y + 2; j++){
      var cell = cells[getIndex(i,j)];
      if(cell && i < cols && i >= 0 && j < rows && j >= 0){
        if(!cell.flagged){
            if(cell.state == 0){
              if(getAlive() >0){
                cell.state = 2;
              }else{
                checkNeighbors(i,j);
              }
            }else if(cell.state == 1){
              cell.state = 3;
              dead = true;
            }
        }
      }
    }
  }

}

function checkNeighbors(x,y){
  var cell = cells[getIndex(x,y)];
  if(cell && x < cols && x >= 0 && y < rows && y >= 0){
    if((getAlive(x,y) == 0) && (cell.state != 1 && cell.state != 2 && !cell.flagged)){
      cycles++;
      cell.state = 2;
      for(var i = x-1; i < x+2; i++){
        for(var j = y-1; j < y + 2; j++){
          var cell = cells[getIndex(i,j)];
          if(cell && i < cols && i >= 0 && j < rows && j >= 0){
            checkNeighbors(i,j);
          }
        }
      }

    }else{
      if(cell.state != 1 && cell.flagged == false) cell.state = 2;
    }
  }

}
