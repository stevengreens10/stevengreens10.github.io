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
                    cells[(x-1)+y*cols].state = 2;
                    cells[(x+1)+y*cols].state = 2;
                    cells[(x)+(y+1)*cols].state = 2;
                    cells[(x+1)+(y+1)*cols].state = 2;
                    cells[(x+1)+(y-1)*cols].state = 2;
                    cells[(x-1)+(y+1)*cols].state = 2;
                    cells[(x-1)+(y-1)*cols].state = 2;
                    cells[(x)+(y-1)*cols].state = 2;
                    cells[(x)+(y)*cols].state = 2;
                    
                    cells[(x-1)+y*cols].flagged = false;
                    cells[(x+1)+y*cols].flagged = false;
                    cells[(x)+(y+1)*cols].flagged = false;
                    cells[(x+1)+(y+1)*cols].flagged = false;
                    cells[(x+1)+(y-1)*cols].flagged = false;
                    cells[(x-1)+(y+1)*cols].flagged = false;
                    cells[(x-1)+(y-1)*cols].flagged = false;
                    cells[(x)+(y-1)*cols].flagged = false;
                    cells[(x)+(y)*cols].flagged = false;


                }
                clicks++;
                cycles = 0;
               //checkNeighbors(x,y);
            }
        }
    }
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
      if(x != 0){
        if(y != rows-1){
          var index = (x-1) + (y+1) * cols;
          if(cells[index].state == 1 || cells[index].state == 3){
            count++;
          }
        }
        if(y != 0){
          var index = (x-1) + (y-1) * cols;
          if(cells[index].state == 1 || cells[index].state == 3){
            count++;
          }
        }
        var index = (x-1) + (y) * cols;
        if(cells[index].state == 1 || cells[index].state == 3){
          count++;
        }
      }
    
      if(y != rows-1){
        var index = (x) + (y+1) * cols;
        if(cells[index].state == 1 || cells[index].state == 3){
          count++;
        }
      }
      if(y != 0){
        var index = (x) + (y-1) * cols;
        if(cells[index].state == 1 || cells[index].state == 3){
          count++;
        }
      }
    
      if(x!= cols-1){
        if(y != rows-1){
          var index = (x+1) + (y+1) * cols;
          if(cells[index].state == 1 || cells[index].state == 3){
            count++;
          }
        }
        if(y!=0){
          var index = (x+1) + (y-1) * cols;
          if(cells[index].state == 1 || cells[index].state == 3){
            count++;
          }
        }
        var index = (x+1) + (y) * cols;
        if(cells[index].state == 1 || cells[index].state == 3){
          count++;
        }
      }
      return count;
}

function getFlagged(x,y){
    var count = 0;
      if(x != 0){
        if(y != rows-1){
          var index = (x-1) + (y+1) * cols;
          if(cells[index].flagged == true){
            count++;
          }
        }
        if(y != 0){
          var index = (x-1) + (y-1) * cols;
          if(cells[index].flagged == true){
            count++;
          }
        }
        var index = (x-1) + (y) * cols;
        if(cells[index].flagged == true){
          count++;
        }
      }
    
      if(y != rows-1){
        var index = (x) + (y+1) * cols;
        if(cells[index].flagged == true){
          count++;
        }
      }
      if(y != 0){
        var index = (x) + (y-1) * cols;
        if(cells[index].flagged == true){
          count++;
        }
      }
    
      if(x!= cols-1){
        if(y != rows-1){
          var index = (x+1) + (y+1) * cols;
          if(cells[index].flagged == true){
            count++;
          }
        }
        if(y!=0){
          var index = (x+1) + (y-1) * cols;
            if(cells[index].flagged == true){
            count++;
          }
        }
        var index = (x+1) + (y) * cols;
        if(cells[index].flagged == true){
          count++;
        }
      }
      return count;
}

function removeUnflagged(x,y){
    if(x != 0){
        
      if(y != rows-1){
        var index = (x-1) + (y+1) * cols;
        if(cells[index].flagged == false){
            if(cells[index].state == 0){
                cells[index].state = 2;
            }else if(cells[index].state == 1){
                cells[index].state = 3;
                dead = true;
            }
        }
      }
      
      if(y != 0){
        var index = (x-1) + (y-1) * cols;
     if(cells[index].flagged == false){
         if(cells[index].state == 0){
             cells[index].state = 2;
         }else if(cells[index].state == 1){
             cells[index].state = 3;
             dead = true;
         }
     }
      }
      
      var index = (x-1) + (y) * cols;
     if(cells[index].flagged == false){
         if(cells[index].state == 0){
             cells[index].state = 2;
         }else if(cells[index].state == 1){
             cells[index].state = 3;
             dead = true;
         }
     }
    }
  
    if(y != rows-1){
      var index = (x) + (y+1) * cols;
    if(cells[index].flagged == false){
        if(cells[index].state == 0){
            cells[index].state = 2;
        }else if(cells[index].state == 1){
            cells[index].state = 3;
            dead = true;
        }
    }
    }
    
    if(y != 0){
      var index = (x) + (y-1) * cols;
      if(cells[index].flagged == false){
          if(cells[index].state == 0){
              cells[index].state = 2;
          }else if(cells[index].state == 1){
              cells[index].state = 3;
              dead = true;
          }
      }
    }
  
    if(x!= cols-1){
        
      if(y != rows-1){
        var index = (x+1) + (y+1) * cols;
        if(cells[index].flagged == false){
            if(cells[index].state == 0){
                cells[index].state = 2;
            }else if(cells[index].state == 1){
                cells[index].state = 3;
                dead = true;
            }
        }
      }
      
      if(y!=0){
        var index = (x+1) + (y-1) * cols;
        if(cells[index].flagged == false){
            if(cells[index].state == 0){
                cells[index].state = 2;
            }else if(cells[index].state == 1){
                cells[index].state = 3;
                dead = true;
            }
        }
      }
      
      var index = (x+1) + (y) * cols;
     if(cells[index].flagged == false){
         if(cells[index].state == 0){
             cells[index].state = 2;
         }else if(cells[index].state == 1){
             cells[index].state = 3;
             dead = true;
         }
     }
    }
}

function checkNeighbors(x,y){
    var index = x + y * cols;
    if(cells[index] != null){
        if((getAlive(x,y) == 0 && (cells[index].state != 1 && cells[index].state != 2)) || cycles ==0){
            cycles++;
            cells[index].state == 2;
            checkNeighbors(x,y+1);
            checkNeighbors(x,y-1);
            checkNeighbors(x+1,y+1);
            checkNeighbors(x-1,y+1);
            checkNeighbors(x+1,y-1);
            checkNeighbors(x-1,y-1);
            checkNeighbors(x+1,y);
            checkNeighbors(x-1,y);
            
        }else{
            if(cells[index].state != 1 && cells[index].state != 2){
                cells[index].state = 2;
            }
        }
    }
}

