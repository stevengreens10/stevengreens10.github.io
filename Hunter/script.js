var gravity = 0.05;
var cornner = false;
var player;
var platform;
var rotating;

function setup(){
  createCanvas(640,480);
  player = new player();
  platform = new platform();

}
function draw(){
    background(0);
    
    player.display();
    player.update();
    platform.display();
    platform.update();
    //cornner = false;
    if(player.x >= width-player.r && player.wall != "right"){// && player.y >= height-player.r){//right
        player.xVel=0;
        player.yVel=-2;
        player.jumping = false;
        player.wall = "right";
        //cornner = true;
    } else if(player.y >= height-player.r && player.wall != "bottom"){//bottom
        player.yVel=0;
        player.xVel=2;
        player.jumping = false;
        player.wall = "bottom";
       // cornner = true;
    }else if(player.x <= player.r && player.wall != "left"){//left
        player.xVel=0;
        player.yVel=2;
        player.jumping = false;
        player.wall = "left";
        //cornner = true;
    }else if(player.y <= player.r && player.wall != "top"){//top 
        player.yVel=0;
        player.xVel=-2;
        player.jumping = false;
        player.wall = "top";
        //cornner = true;
    }//check for cornners
    
    if(rotating){
        if(player.x - player.r > rotating.x + rotating.wr && player.wall != "right"){
            player.xVel=0;
            player.yVel=-2;
            player.x = rotating.x+rotating.wr+player.r;
            player.wall = "right";
            console.log("right");
        }else if(player.y <= rotating.y - rotating.hr && player.wall != "top"){
            player.yVel=0;
            player.xVel=-2;
            player.y = rotating.y-75-player.r;
            player.wall = "top";
            console.log("top");
        }else if(player.x + player.r <= rotating.x - rotating.wr && player.wall != "left"){
            player.xVel=0;
            player.yVel=2;
            player.x = rotating.x-rotating.wr-player.r;
            player.y = rotating.y - rotating.hr;
            player.wall = "left";
           console.log("left");
        }else if(player.y >= rotating.y+rotating.hr && player.wall != "bottom"){
            player.yVel=0;
            player.xVel=2;
            player.y = rotating.y+rotating.hr+player.r;
            player.wall = "bottom";
        }
        
        //player.x + player.r <= rotating.x - rotating.wr && player.wall != "left"
}
}
function keyPressed(){
    if(key == ' ' && !player.jumping){
           player.jump();
    }
}
