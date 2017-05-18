function Cell(x,y){ // Constructor for cell object
    this.col = x;
    this.row = y;
    
    //Booleans for drawing walls
    this.top = true;
    this.bottom = true;
    this.left = true;
    this.right = true;
    //Cell should only be visited once
    this.visited = false;
    this.inPath = false;

    this.display = function(){
        var x = this.col * scl;
        var y = this.row * scl;
        
        push();
            strokeWeight(0);
            noFill();
            /*if(this.visited) fill(200,0,220);
            if(this == current) fill(0,255,0,100);
            
            var inStack = false;
            for(var i = 0; i < stack.length ; i++){
                if(stack[i] == this) inStack = true;
            }
            
            if(inStack) fill(200,200,0);
            if(this == end) fill(255,0,0);*/
            
            if(this == player && state == 0) fill(0,255,0);
            
            rect(x,y,scl,scl);
        pop();
        
        stroke(255);
        strokeWeight(5);
        //Top left to top right
        if(this.top) line(x,y,x+scl,y);
        //Top right to bottom right
        if(this.right) line(x+scl,y,x+scl,y+scl);
        //Bottom right to bottom left
        if(this.bottom) line(x+scl,y+scl,x,y+scl);
        //Bottom left to top left
        if(this.left) line(x,y+scl,x,y);
        
        var mx = x + scl/2;
        var my = y + scl/2;
        
        if(this.inPath && state == 1){
            stroke(0,255,0);
            var box = grid[getIndex(this.col, this.row-1)]; //ABOVE
            if(box && box.inPath && !this.top){
                line(mx,my,(box.col * scl) + scl/2, (box.row * scl) + scl/2);
            }
            box = grid[getIndex(this.col, this.row+1)]; //BELOW
            if(box && box.inPath && !this.bottom){
                line(mx,my,(box.col * scl) + scl/2, (box.row * scl) + scl/2);
            }
            box = grid[getIndex(this.col-1, this.row)]; //LEFT
            if(box && box.inPath && !this.left){
                line(mx,my,(box.col * scl) + scl/2, (box.row * scl) + scl/2);
            }
            box = grid[getIndex(this.col+1, this.row)]; //RIGHT
            if(box && box.inPath && !this.right){
                line(mx,my,(box.col * scl) + scl/2, (box.row * scl) + scl/2);
            }
            
            if(this == grid[0]){
                line(mx,my,mx,0);
            }else if(this == grid[grid.length-1]){
                line(mx,my,mx,height);
            }
        }
        
      
    }
    
    this.pickNeighbor = function(){
        
        var neighbors = [];
        var x = this.col;
        var y = this.row;
        var right = grid[getIndex(x+1,y)];
        var left = grid[getIndex(x-1,y)];
        var top = grid[getIndex(x,y-1)];
        var bottom = grid[getIndex(x,y+1)];
        
        //Push all the neighbors into an array if they haven't been visited
        if(right && !right.visited){
             neighbors.push(right);
        }
        if(left && !left.visited){
             neighbors.push(left);
        }
        if(top && !top.visited){
             neighbors.push(top);
        }
        if(bottom && !bottom.visited) {
             neighbors.push(bottom);
        }
        
        //Pick a random neighbor from the array if there are any available
        if(neighbors.length > 0){
            var r = floor(random(neighbors.length));
            var n =  neighbors[r];
            return n;
        }else{
            return undefined;
        }
        
    }
}





function getIndex(x,y){
    if(x < 0 || x > cols-1 || y < 0 || y > rows-1){
        return -1; //Returns an index that doesn't exist if the cell is out of the board
    }else{
        return x + y * cols;
    }
}
