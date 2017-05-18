const scl = 40;
var cols, rows;

var grid = [];
var player;
var state =0;

var cheating = false;
function setup(){
    createCanvas(643,483);
     reset();
    
    var player = grid[0];
}

function reset(){
    generate();
    state = 0;
}

function keyPressed(){
    if(key == 'R'){
        reset();
    }else if(key == 'W' || keyCode == UP_ARROW){
        var box = grid[getIndex(player.col, player.row-1)];
        if(box && !player.top) player = box;
    }else if(key == 'A' || keyCode == LEFT_ARROW){
         var box = grid[getIndex(player.col-1, player.row)];
         if(box && !player.left) player = box;
    }else if(key == 'S' || keyCode == DOWN_ARROW){
         var box = grid[getIndex(player.col, player.row+1)];
         if(box && !player.bottom) player = box;
         
         if(player == grid[grid.length-1]){
             state = 1;
         }
    }else if(key == 'D' || keyCode == RIGHT_ARROW){
         var box = grid[getIndex(player.col+1, player.row)];
         if(box && !player.right) player = box;
    }else if(key == " "){
        cheating = !cheating;
    }
}

function draw(){
    background(51);
    if(state == 0){
        drawGrid();
    }else{
        push();
        textAlign(CENTER);
        textSize(50);
        fill(255);
        noStroke();
        text("Congratulations",width/2,height/2);
        text("R to reset", width/2, height/2 + 50);
        pop();

    }
}

function generate(){
    var current;
    var end;
    var stack = [];
    
    cols = floor(width/scl);
    rows = floor(height/scl);
    for(var y = 0; y < rows; y++){
        for(var x = 0; x < cols; x++){
            var index = x+y * cols;
            grid[index] = new Cell(x,y);
        }
    }
    
    end = grid[grid.length-1];
    end.bottom = false;
    current = grid[0]; // Current cell is the first cell
    current.top = false;
    
    player = grid[0];
    
    var cells_left = grid.length;

    while(cells_left > 0 || stack.length != 0){
        cells_left = 0;
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
        
        for(let i= 0; i < grid.length; i++){
            if(grid[i].visited == false){
                cells_left++;
            }
        }
    }
}



function drawGrid(){
        var displayed = [];
        displayed.push(player);
        if(grid[getIndex(player.col, player.row-1)] && !player.top)displayed.push(grid[getIndex(player.col, player.row-1)]);
        if(grid[getIndex(player.col, player.row+1)] && !player.bottom)displayed.push(grid[getIndex(player.col, player.row+1)]);
        if(grid[getIndex(player.col-1, player.row)] && !player.left)displayed.push(grid[getIndex(player.col-1, player.row)]);
        if(grid[getIndex(player.col+1, player.row)] && !player.right)displayed.push(grid[getIndex(player.col+1, player.row)]);

        for(var i = 0; i < displayed.length; i++){
            displayed[i].display();
        }
        
        if(cheating){
            for(var i = 0; i < grid.length; i++){
                grid[i].display();
            }
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
