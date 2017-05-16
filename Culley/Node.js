
function Node(x,y,state){
    this.state = state;
    this.x = x;
    this.y = y;
    this.horizLine = random(100) < 90;
    this.verticLine = random(100) < 90;
    
    var pixelX;
    var pixelY;
    
    this.display = function(){
        fill(255);
        stroke(150);
        strokeCap(ROUND);
        strokeWeight(10.0);
        
        pixelX = (this.x * scl) + mx;
        pixelY = (this.y * scl) + my;
        
        if(mouseX > pixelX - scl/2 && mouseX < pixelX + scl/2 && mouseY > pixelY - scl/2 && mouseY < pixelY + scl/2){
                ex = pixelX;
                ey = pixelY;
        }
        
        if(index > 1 && index < col * row - 1 && (this.state == 1 || nodes[index+1].state == 1)){
            if(this.x < col - 1 && this.horizLine){
                stroke(150);
                line(pixelX, pixelY, pixelX + scl, pixelY);
            }
        }
        
        if(index < col * row - col && (this.state == 1 || nodes[index+col].state == 1))
        if(this.y < row - 1 && this.verticLine){
            stroke(150);
            line(pixelX, pixelY, pixelX, pixelY + scl);
        }
    }
    
    this.stream = function(){
        stroke(255,0,0);
        strokeCap(ROUND);
        strokeWeight(10.0);
        
        pixelX = (this.x * scl) + mx;
        pixelY = (this.y * scl) + my;
        
        if(this.x < col - 1 && this.state == 1 && nodes[index+1].state == 1 && this.horizLine){
            line(pixelX, pixelY, pixelX + scl, pixelY);
        }
        
        if(this.y < row - 1 && this.state == 1 && nodes[index+col].state == 1 && this.verticLine){
            line(pixelX, pixelY, pixelX, pixelY + scl);
        }
    }
    
    this.connectedTo = function(){
        var connected = false;
        
        if(nodes[getIndex(this.x-1,this.y)] && nodes[getIndex(this.x-1,this.y)].state == 1 && nodes[getIndex(this.x-1,this.y)].horizLine){
            print("Left");
          connected = true;  
        } 
        if(nodes[getIndex(this.x+1,this.y)] && nodes[getIndex(this.x+1,this.y)].state == 1 && this.horizLine){
            print("Right");
          connected = true;  
        } 
        if(nodes[getIndex(this.x,this.y-1)] && nodes[getIndex(this.x,this.y-1)].state == 1 && nodes[getIndex(this.x,this.y-1)].verticLine){
            print("Up");
            connected = true;
        }
        if(nodes[getIndex(this.x-1,this.y+1)] && nodes[getIndex(this.x,this.y+1)].state == 1 && this.verticLine){
            print("Down");
            connected = true;
        } 
        
            return connected;
    }
}
