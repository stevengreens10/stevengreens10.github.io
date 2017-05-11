function Bullet(x,y,vel,effects){
    this.pos = createVector(x,y);
    this.vel = vel;
    this.dead = false;
    this.effects = effects;

    this.update = function(){
        this.pos.add(this.vel);
        this.offScreen();
        this.display();
    }

    this.display = function(){
        push();

        var effect = 0;
        
        for(var i = this.effects.length-1; i >= 0; i--){
            if(this.effects[i] != 7 && this.effects[i] != 8){
                effect = this.effects[i];
                break;
            }
        }

        if(effect == 1){
            fill(255,0,125);
        }else if(effect == 2){
            fill(0,255,0);
        }else if(effect == 3){
            fill(226,224,66);
        }else if(effect == 4){
            fill(100,200,100);
        }else if(effect == 5){
            fill(200,100,100);
        }else if(effect == 6){
            fill(66, 173, 244);
        }else if(effect == 8){
            fill(219, 61, 179);
        }else{
            fill(255,0,0);
        }
        ellipse(this.pos.x,this.pos.y,10,10);
        pop();
    }

    this.offScreen = function(){
        if(this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height){
            if(!player.hasPowerup(1)){
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

    this.hasEffect = function(id){
        for(var i = 0; i < this.effects.length; i++){
            if(this.effects[i] == id){
                return true;
            }
        }

        return false;

    }
}
