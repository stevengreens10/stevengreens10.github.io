function Cell(col,row,value){
  this.col = col;
  this.row = row;
  this.value = value;
  this.required = false;

  this.update = function(){
    this.display();
  }

  this.display = function(){
    push();
    rect(this.col * scl, this.row * scl, scl, scl);
    if(this.required) textStyle(BOLD);
    textAlign(CENTER);
    text(this.value,this.col*scl,this.row*scl);
  }
}
