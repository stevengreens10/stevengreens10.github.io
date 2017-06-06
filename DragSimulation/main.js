const mToP = 1;

var bullet;

function setup(){
  createCanvas(640,480);
  bullet = new Bullet(100,15,1);
}

function draw(){
  background(51);

  var drag = calcDragForceOn(bullet);
  bullet.applyForce(drag);
  var gravity = calcGravityOn(bullet);
  bullet.applyForce(gravity);

  bullet.update();
}

function calcDragForceOn(object){
  var dragMagnitude = object.vel.x * object.vel.x;
  var drag = createVector(-dragMagnitude, 0);//object.vel.copy();
  //drag.mult(-1);
  drag.setMag(dragMagnitude);
  drag.mult(0.005);
  return drag;
}

function calcGravityOn(object){
  var grav = createVector(0,metersToPixels(9.8));
  grav.mult(0.01);
  return grav;
}

function metersToPixels(meters){
  return (meters * mToP);
}

function pixelsToMeters(pixels){
  return (pixels / mToP);
}
