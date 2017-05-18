function player(){
    this.r = 23;
    this.d = this.r * 2;
    this.x = width/2;
    this.y = height - this.r;
    
    this.xVel = 2;
    this.yVel = 0;
    this.jumping = false;
    this.wall = "bottom";
    this.jumpSpeed = 2;
    
    this.update = function(){
        
        this.x+=this.xVel;
        this.y+=this.yVel;
        this.x = constrain(this.x, this.r, width-this.r);
        this.y = constrain(this.y, this.r, height-this.r);
        
        print(this.jumping);
    
        if(this.jumping){
           if(this.wall == "bottom"){
               this.yVel += gravity;
               if(this.y >= height - this.r){
                   this.jumping = false;
                   this.yVel = 0;
               }
           }else if(this.wall == "top"){
               this.yVel -= gravity;
               if(this.y <= this.r){
                   this.jumping = false;
                   this.yVel = 0;
               }
           }else if(this.wall == "right"){
               this.xVel += gravity;
               if(this.x >= width - this.r){
                   this.jumping = false;
                   this.xVel = 0;
               }
           }else if(this.wall == "left"){
               this.xVel -= gravity;
               if(this.x <= this.r){
                   this.jumping = false;
                   this.xVel = 0;
               }
           }
        }
        
    }
    this.display = function(){
        
        fill(255);
        ellipse(this.x,this.y,2*this.r,2*this.r);
    }
    
    this.jump = function(){
        this.jumping = true;
        if(this.wall == "left"){
            this.xVel=this.jumpSpeed;
        }
        else if(this.wall == "right"){
            this.xVel=-this.jumpSpeed;    
        }
        else if(this.wall == "bottom"){
            this.yVel=-this.jumpSpeed;
        }
        else if(this.wall == "top"){
            this.yVel = this.jumpSpeed;
        }
    }
}
