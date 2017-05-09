function Bullet(x,y,vel,effect){
    this.pos = createVector(x,y);
    this.vel = vel;
    this.dead = false;
    this.effect = effect;

    this.update = function(){
        this.pos.add(this.vel);
        this.offScreen();
        this.display();
    }

    this.display = function(){
        push();
        if(this.effect == 1){
            fill(255,0,125);
        }else if(this.effect == 2){
            fill(0,255,0);
        }else if(this.effect == 3){
            fill(226,224,66);
        }else if(this.effect == 4){
            fill(100,200,100);
        }else if(this.effect == 5){
            fill(200,100,100);
        }else if(this.effect == 6){
            fill(66, 173, 244);
        }else{
            fill(255,0,0);
        }
        ellipse(this.pos.x,this.pos.y,10,10);
        pop();
    }

    this.offScreen = function(){
        if(this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height){
            if(this.effect != 1){
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
