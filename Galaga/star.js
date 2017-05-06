function Star(){
    this.pos = createVector(random(width),0);
    this.vel = createVector(0,7);
    colorMode(HSB);
    this.col = color(random(360),100,100);
    colorMode(RGB);
    this.r = 2;
    
    //this.history = [];
    
    this.update = function(){
        this.pos.add(this.vel);
        this.display();
      /*  if(this.history.length <= 2){
            this.history.push(this.pos.copy());
        }else{
            this.history.splice(0,1);
        }*/
    }
    
    this.display = function(){
        push();
        strokeWeight(0);
        
        /*for(var i = 0; i < this.history.length;i++){
            var size = this.r*2;//map(i,0,this.history.length,1,this.r);
            fill(0,255,0,15);
            ellipse(this.history[i].x,this.history[i].y,size*2,size*2);
        }*/
        
        
        fill(this.col);

        ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
        fill(255,180);
        ellipse(this.pos.x,this.pos.y,this.r*2+0.1,this.r*2+0.1);
        
        
        pop();
    }
    
    this.isOffScreen = function(){
        return (this.pos.y >= height+20)
    }
}