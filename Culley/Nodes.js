function Node(x,y,state){
    this.state = state;
    this.x = x;
    this.y = y;
    this.horizLine = random(100) < 90;
    this.verticLine = random(100) < 90;
    
    var pixelX;
    var pixelY;
    
    this.display = function(player){
        stroke(150);
        strokeCap(ROUND);
        strokeWeight(10.0);
        
        pixelX = (this.x * scl) + mx;
        pixelY = (this.y * scl) + my;
        
        if(mouseX > pixelX - scl/2 && mouseX < pixelX + scl/2 && mouseY > pixelY - scl/2 && mouseY < pixelY + scl/2){
                ex = pixelX;
                ey = pixelY;
        }
        
        if(this.state == player){
            stroke(150);
            if(nodes[getIndex(this.x-1,this.y)] && nodes[getIndex(this.x-1,this.y)].horizLine && this.x != 0){
                stroke(150);
                line(pixelX,pixelY,pixelX - scl,pixelY);
            }
            if(nodes[getIndex(this.x+1,this.y)] && this.horizLine && this.x != col-1){
                stroke(150);
                line(pixelX,pixelY,pixelX + scl,pixelY);
            }
            if(nodes[getIndex(this.x,this.y-1)] && nodes[getIndex(this.x,this.y-1)].verticLine){
                stroke(150);
                line(pixelX,pixelY,pixelX,pixelY - scl);
            }
            if(nodes[getIndex(this.x,this.y+1)] && this.verticLine){
                stroke(150);
                line(pixelX,pixelY,pixelX,pixelY + scl);
            }
        }
    }
    
    this.detect = function(player){
        if(this.state == player){
            if(nodes[getIndex(this.x-1,this.y)] && nodes[getIndex(this.x-1,this.y)].horizLine && this.x != 0){
                noStroke();
                if(nodes[getIndex(this.x-1,this.y)].state == opm && player == 3 && this.state == 3){
                    if(mode == 1) stroke(0,0,255);
                    if(mode == 2) stroke(255,0,0);
                }
                line(pixelX,pixelY,pixelX - scl,pixelY);
                if(nodes[getIndex(this.x-1,this.y)].state == opm){
                    if(mode == 1) stroke(0,0,255);
                    if(mode == 2) stroke(255,0,0);
                    point(pixelX - scl,pixelY);
                }
            }
            if(nodes[getIndex(this.x+1,this.y)] && this.horizLine && this.x != col-1){
                noStroke();
                if(nodes[getIndex(this.x+1,this.y)].state == opm && player == 3 && this.state == 3){
                    if(mode == 1) stroke(0,0,255);
                    if(mode == 2) stroke(255,0,0);
                }
                line(pixelX,pixelY,pixelX + scl,pixelY);
                if(nodes[getIndex(this.x+1,this.y)].state == opm){
                    if(mode == 1) stroke(0,0,255);
                    if(mode == 2) stroke(255,0,0);
                    point(pixelX + scl,pixelY);
                }
            }
            if(nodes[getIndex(this.x,this.y-1)] && nodes[getIndex(this.x,this.y-1)].verticLine){
                noStroke();
                if(nodes[getIndex(this.x,this.y-1)].state == opm && player == 3 && this.state == 3){
                    if(mode == 1) stroke(0,0,255);
                    if(mode == 2) stroke(255,0,0);
                }
                line(pixelX,pixelY,pixelX,pixelY - scl);
                if(nodes[getIndex(this.x,this.y-1)].state == opm){
                    if(mode == 1) stroke(0,0,255);
                    if(mode == 2) stroke(255,0,0);
                    point(pixelX,pixelY - scl);
                }
            }
            if(nodes[getIndex(this.x,this.y+1)] && this.verticLine){
                noStroke();
                if(nodes[getIndex(this.x,this.y+1)].state == opm && player == 3 && this.state == 3){
                    if(mode == 1) stroke(0,0,255);
                    if(mode == 2) stroke(255,0,0);
                }
                line(pixelX,pixelY,pixelX,pixelY + scl);
                if(nodes[getIndex(this.x,this.y+1)].state == opm){
                    if(mode == 1) stroke(0,0,255);
                    if(mode == 2) stroke(255,0,0);
                    point(pixelX,pixelY+scl);
                }
            }
        }
    }
    
    this.stream = function(player){
        if(player == 1) stroke(255,0,0);
        if(player == 2) stroke(0,0,255);
        if(player == 3) stroke(150,0,150);
        strokeCap(ROUND);
        strokeWeight(10.0);
        
        pixelX = (this.x * scl) + mx;
        pixelY = (this.y * scl) + my;
        
        if(this.x < col - 1 && (this.state == player || this.state == 3) && 
        (nodes[index+1].state == player || nodes[index+1].state == 3) && this.horizLine){
            line(pixelX, pixelY, pixelX + scl, pixelY);
        }
        
        if(this.y < row - 1 && (this.state == player || this.state == 3) && 
        (nodes[index+col].state == player || nodes[index+col].state == 3) && this.verticLine){
            line(pixelX, pixelY, pixelX, pixelY + scl);
        }
        if(this.state == 3){
            stroke(150,0,150);
            point(pixelX,pixelY);
        }
    }
    
    this.connectedTo = function(player){
        var connected = false;
        
        if(nodes[getIndex(this.x-1,this.y)] && (nodes[getIndex(this.x-1,this.y)].state == player || nodes[getIndex(this.x-1,this.y)].state == 3) && nodes[getIndex(this.x-1,this.y)].horizLine && this.x != 0){
            print("Right");
          connected = true;  
        } 
        if(nodes[getIndex(this.x+1,this.y)] && (nodes[getIndex(this.x+1,this.y)].state == player || nodes[getIndex(this.x+1,this.y)].state == 3) && this.horizLine && this.x != col-1){
            print("Left");
          connected = true;  
        } 
        if(nodes[getIndex(this.x,this.y-1)] && (nodes[getIndex(this.x,this.y-1)].state == player || nodes[getIndex(this.x,this.y-1)].state == 3) && nodes[getIndex(this.x,this.y-1)].verticLine){
            print("Down");
            connected = true;
        }
        if(nodes[getIndex(this.x,this.y+1)] && (nodes[getIndex(this.x,this.y+1)].state == player || nodes[getIndex(this.x,this.y+1)].state == 3) && this.verticLine){
            print("Up");
            connected = true;
        } 
        
            return connected;
    }
}




