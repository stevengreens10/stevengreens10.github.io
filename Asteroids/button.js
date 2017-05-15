function Button(string,x,y,w,h,state){
  this.string = string;
  this.textSize = 12;
  this.bgColor = color(255,255,255);
  this.state = state;
  this.hoverColor = color(200);
  this.textColor = color(0,0,0);
  this.hasStroke = false;
  this.disabled = false;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.update = function(){

    this.display();
  }

  this.display = function(){
    push();
      rectMode(CENTER);
      fill(this.bgColor);
      if(this.isHoveringOver() || this.disabled) fill(this.hoverColor);
      if(!this.hasStroke) noStroke(); 
      rect(this.x,this.y,this.w,this.h);

      textAlign(CENTER);
      textSize(this.textSize);
      fill(this.textColor);
      text(this.string,this.x,this.y+(this.h/5));
    pop();
  }

  this.isHoveringOver = function(){
    if(mouseX > this.x - (this.w/2) && mouseX < this.x + this.w/2 && mouseY > this.y - (this.h/2) && mouseY < this.y + this.h/2){
      return true;
    }else{
      return false;
    }
  }


}
