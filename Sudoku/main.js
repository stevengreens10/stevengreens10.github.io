var grid = [];
var scl = 40;
var sudoku;

function setup(){
    createCanvas(360,360);
    sudoku = loadTable("sudoku.csv");

    for(var x = 0; x < 9; x++){
      for(var y = 0; y < 9; y++){
        var cell = new Cell(x,y,sudoku.rows[x].arr[y]);
        cell.required = true;
        grid[getIndex(x,y)] = cell;
      }
    }

}

function draw(){
  background(255);
  for(var i = 0; i < grid.length; i++){
    var cell = grid[i];
    cell.update();
  }
}

function getIndex(x,y){
  return x + y * 9;
}
