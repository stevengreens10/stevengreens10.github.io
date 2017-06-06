function Bullet(initialV, radius, mass){
  this.pos = createVector(0, height/2);
  this.vel = createVector(initialV, 0);
  this.acc = createVector(0,0);
  this.m = mass;
  this.r = radius;

  this.update = function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    //console.log(this.acc);
    this.acc.mult(0);
    this.display();
  }

  this.display = function(){
    fill(255,0,0);
    ellipse(this.pos.x,this.pos.y,this.r*2);
  }

  this.applyForce = function(force){
    force.div(this.m);
    this.acc.add(force);
  }
}
