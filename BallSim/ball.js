function Ball(color,x){
    this.color = color;
    this.x = x;
    
    this.paint = function(ball){
        ball.color = this.color;
    }
    
    this.display = function(){
      /*  if(this.color == 0)
            fill(255,0,0);
        if(this.color == 1)
            fill(255,0,255);
        if(this.color == 2)
            fill(0,0,255);
        if(this.color == 3)
            fill(0,255,0);
        if(this.color == 4)
            fill(123,129,50);*/
        var r = map(this.color,0,numBalls-1,0,255);
        var g = map(this.color,0,numBalls-1,255,0)
        fill(r,g,g);
        
        if(this == selected){
            stroke(255);
        }else if(this == painted){
            stroke(255,0,0);
        }else{
            stroke(0);
        }
        
        ellipse(this.x,height/2,50,50);
    
    }
    
    this.getColor = function(){
        return this.color();
    }
    
    
    
}