function platform(){
    
    this.wr = 50;
    this.hr = 75;
    this.x = (width - player.r- 41) - this.wr - player.r;
    this.y = (height - player.r- 41) - this.hr - player.r;
    this.update = function(){
        this.isColliding();
    }
    this.display = function(){
        fill(255);
        rectMode(CENTER);
        rect(this.x,this.y,this.wr * 2,this.hr*2);
        
    }
    
    this.isColliding = function(){
        if(player.x + player.r >= this.x - this.wr && player.x - player.r <= this.x + this.wr){
            if(player.y + player.r >= this.y - this.hr && player.y - player.r <= this.y + this.hr){
    //            print("COLLIDING");
                    if(rotating != this) player.jumping = false;
                    //player.y = this.y + 75 + player.r;
                    rotating = this;
                        
        }

            }
        }
    }
