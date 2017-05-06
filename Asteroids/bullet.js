function Bullet(x,y,vel){
    this.pos = createVector(x,y);
    this.vel = vel;
    this.dead = false;
    
    this.update = function(){
        this.pos.add(this.vel);
        this.offScreen();
        this.display();
    }
    
    this.display = function(){
        push();
        if(player.powerup == 1){
            fill(255,0,125);
        }else if(player.powerup == 2){
            fill(0,255,0);
        }else if(player.powerup == 3){
            fill(226,224,66);
        }else if(player.powerup == 4){
            fill(100,200,100);
        }else if(player.powerup == 5){
            fill(200,100,100);    
        }else{
            fill(255,0,0);
        }
        ellipse(this.pos.x,this.pos.y,10,10);
        pop();
    }
    
    this.offScreen = function(){
        if(this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height){
            if(player.powerup != 1){
                this.dead = true;
            }else{
                if(this.pos.x > width){
                    this.pos.x = 0;
                }if(this.pos.x < 0){
                    this.pos.x = width;
                }if(this.pos.y > height){
                    this.pos.y = 0;
                }if(this.pos.y < 0){
                    this.pos.y = height;
                }
            }
        }
    }
}