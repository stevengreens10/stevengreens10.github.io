var cells = [];
var cols;
var rows;
var scl;
var dead = false;
var cycles = 0;
var count =0;
var numMines = 99;
var numFlagged = 0;
var flaggedP;
var won = false;

function setup(){
    cols = 24;
    rows = 24;
    scl = 25;

    createCanvas(cols*scl+1,rows*scl+1);

    generate();
    
    flaggedP = createP(numFlagged + " / " + numMines);


}

function draw(){
    drawGrid();
    fill(0);
    textSize(15);
    if(dead){
        text("Press a key to reset",20,height-10);
    }else if(!won){
        text("Press a key to place a flag",20,height-10);
    }else{
        text("You won!", 20, height-10);
    }
    
    if(numFlagged == numMines){
        won = checkValid();
    }
    
}

function checkValid(){
    var valid = true;
    
    for(var i = 0; i < cells.length; i++){
        if(cells[i].state == 1 && !cells[i].flagged) valid = false;
        if(cells[i].state != 1 && cells[i].flagged) valid = false;
    }
    
    return valid;
}

function drawGrid(){
    numFlagged = 0;
    for(x = 0; x < cols; x++){
        for(y = 0; y < rows; y++){
            var index = x+y * cols;
            cells[index].display();
            var alive = getAlive(x,y);
            if(cells[index].flagged) numFlagged++;
           if(cells[index].state == 2){
                fill(0);
                if(alive >0){
                    textSize(scl/2 + scl/4);
                    text(alive,x*scl+(scl * 1/3),y*scl+(scl * 3/4));
                }
           }
        }
    }
    flaggedP.html(numFlagged + " / " + numMines);
}

function generate(){
    clicks = 0;
    numFlagged = 0;
    for(x = 0; x < cols; x++){
        for(y = 0; y < rows; y++){
            var index = x + y * cols;
            var state =0;
            cells[index] = new Cell(state,x,y);
        }
    }
    
    while(getMines() < numMines){
        var index = floor(random(cells.length));
        var cell = cells[index];
        if(cell.state == 0){
            cells[index].state = 1;
        }
    }
    
}

function mousePressed(){


    if(!dead && !won){
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
                    
                    if(getMines() < numMines){
                        while(getMines() < numMines){
                            var index = floor(random(cells.length));
                            var cell = cells[index];
                            if(cell.state == 0){
                                cells[index].state = 1;
                            }
                        }
                    }
                }
                clicks++;
            }
        }
    }
}

function getMines(){
    var mines = 0;
    for(var i = 0; i < cells.length; i++){
        if(cells[i].state == 1) mines++;
    }
    return mines;
}    

function getIndex(x,y){
  return x + y * cols;
}

function keyPressed(){
    if(dead || won){
        dead = false;
        generate();
    }else if(!won){
        if(mouseX >0 && mouseX < width && mouseY < height && mouseY > 0){
            var x = int(mouseX/scl);
            var y  = int(mouseY/scl);
            var index = x + y *cols;
            if(cells[index].state == 0 || cells[index].state == 1){
              cells[index].flagged = !cells[index].flagged;
              if(cells[index].flagged){
                  numFlagged++;
              }else{
                  numFlagged--;
              }
            }


        }
    }
    
    if(key == " " || keyCode == DOWN_ARROW || keyCode == UP_ARROW) return false;
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
