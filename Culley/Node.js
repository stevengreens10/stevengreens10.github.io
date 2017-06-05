function Node(x,y,state){
    this.state = state;
    this.x = x;
    this.y = y;
    this.horizLine = random(100) < 80;
    this.verticLine = random(100) < 80;

    this.owners = [];

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

        strokeCap(ROUND);
        strokeWeight(10.0);

        pixelX = (this.x * scl) + mx;
        pixelY = (this.y * scl) + my;

        if(this.x < col - 1 && this.state == 1 && nodes[index+1].state == 1 && this.horizLine){

          if(this.hasOwner(1) && this.hasOwner(2) && nodes[index+1].hasOwner(1) && nodes[index+1].hasOwner(2)){
              stroke(100,0,100);
          }else if(this.hasOwner(1) && nodes[index+1].hasOwner(1)){
              stroke(255,0,0);
          }else if(this.hasOwner(2) && nodes[index+1].hasOwner(2)){
              stroke(0,0,255);
          }else{
              stroke(150);
          }
            line(pixelX, pixelY, pixelX + scl, pixelY);
        }

        if(this.y < row - 1 && this.state == 1 && nodes[index+col].state == 1 && this.verticLine){

          if(this.hasOwner(1) && this.hasOwner(2) && nodes[index+col].hasOwner(1) && nodes[index+col].hasOwner(2)){
              stroke(100,0,100);
          }else if(this.hasOwner(1) && nodes[index+col].hasOwner(1)){
              stroke(255,0,0);
          }else if(this.hasOwner(2) && nodes[index+col].hasOwner(2)){
              stroke(0,0,255);
          }else{
            stroke(150);
          }
            line(pixelX, pixelY, pixelX, pixelY + scl);
        }
    }

    this.connectedTo = function(player){
        var connected = false;

            if(nodes[getIndex(this.x-1,this.y)] && nodes[getIndex(this.x-1,this.y)].hasOwner(player) && nodes[getIndex(this.x-1,this.y)].state == 1 && nodes[getIndex(this.x-1,this.y)].horizLine){
              connected = true;
            }
            if(nodes[getIndex(this.x+1,this.y)] && nodes[getIndex(this.x+1,this.y)].hasOwner(player) && nodes[getIndex(this.x+1,this.y)].state == 1 && this.horizLine){
              connected = true;
            }
            if(nodes[getIndex(this.x,this.y-1)] && nodes[getIndex(this.x,this.y-1)].hasOwner(player) && nodes[getIndex(this.x,this.y-1)].state == 1 && nodes[getIndex(this.x,this.y-1)].verticLine){
                connected = true;
            }
            if(nodes[getIndex(this.x,this.y+1)] && nodes[getIndex(this.x,this.y+1)].hasOwner(player) && nodes[getIndex(this.x,this.y+1)].state == 1 && this.verticLine){
                connected = true;
            }
            return connected;

    }

    this.hasOwner = function(number){
        var owner = false;
        for(var i = 0; i < this.owners.length; i++){
            if(this.owners[i] == number) owner = true;
        }

        return owner;
    }
}
