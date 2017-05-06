function EnemyLaser(x,y){
 this.pos = createVector(x,y);
 this.vel = createVector(0,5);
 this.r = 8;
 

 this.update = function(){
     this.pos.add(this.vel);
     this.display();
 }
 this.display = function(){
     fill(255,0,0);
     ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
 }
 this.isOffScreen = function(){
     return this.pos.y > height+20;
 }
 

 
}