/*Adapted from recursive backtracker algorithm on https://en.wikipedia.org/wiki/Maze_generation_algorithm*/

const scl = 40;
var cols,rows;
var grid = [];
var current;
var stack = [];
var cells_left;
var end;
function setup(){
    createCanvas(640,480);
    reset();
}

function reset(){
    cols = floor(width/scl);
    rows = floor(height/scl);
    for(var y = 0; y < rows; y++){
        for(var x = 0; x < cols; x++){
            var index = x+y * cols;
            grid[index] = new Cell(x,y);
        }
    }
    
    end = grid[grid.length-1];
    current = grid[0]; // Current cell is the first cell
    background(51);

}

function keyPressed(){
    if(key == 'R'){
        reset();
    }
}

function draw(){
    drawGrid();
    
        current.visited = true;
        var next = current.pickNeighbor(); //Randomly picks an unvisited neighbor to go to
        if(next){
            stack.push(current); //Adds the next cell that it is visiting to the stack if there is an available neighbor
            next.visited = true;
            removeWalls(current,next); // Removes the walls between current and next cell
            current = next; // Sets the current cell to the next cell for the next iteration
        }else if(stack.length != 0){
            
            //If the current cell has no avaiable neighbors, it will go through the stack to retrace its steps until it finds neighbors
            current = stack[stack.length-1];
            //Remove the element from the stack when retracing steps
            stack.pop();
        }
    
}



function drawGrid(){
     cells_left = 0;
    for(var i= 0; i < grid.length; i++){
        grid[i].display();
        if(grid[i].visited == false){
            cells_left++;
        }
    }
    
    var num_cells = cols*rows;
    var percent_done = round(((num_cells-cells_left) / (num_cells)) * 100);
    if(cells_left > 0){
      print("[" + (num_cells-cells_left) + "/" + num_cells+"] " + percent_done + "% done");
    }
}

function removeWalls(a,b){
    var dx = a.col - b.col;
    var dy = a.row - b.row;
    
    if(dx == 1){
        a.left = false;
        b.right = false;
    }else if(dx == -1){
        a.right = false;
        b.left = false;
    }else if(dy == 1){
        a.top = false;
        b.bottom = false;
    }else if(dy == -1){
        a.bottom = false;
        b.top = false;
    }
}
