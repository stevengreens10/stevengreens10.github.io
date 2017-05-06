function Cell(state,x,y){
  this.state = state;
  this.x = x;
  this.y = y;

  this.display = function(){
      if(state == true){
        fill(0);
      }else{
        fill(255);
      }
      rect(this.x*scl,this.y*scl,scl,scl);
  }
}
