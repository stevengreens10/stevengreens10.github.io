var chinese;

function preload(){
  chinese = loadFont("./chinese.ttf");
}

function setup(){
  createCanvas(640,480);
  textFont(chinese);
  textSize(30);
  text("Hi",width/2,height/2);
}
