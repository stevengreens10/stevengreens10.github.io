function Player(){
    this.pos = createVector(width/2,height/2);
    this.speed = 0;
    this.r = 5;
    this.lives = 3;
    this.angle = 0;
    this.direction = createVector(cos(this.angle + PI/2),sin(this.angle + PI/2));
    this.angleV = 0;
    this.powerup = 0;
    this.effects = [];

    this.update = function(){
        this.direction = createVector(cos(this.angle + PI/2),sin(this.angle + PI/2));



        var vel = this.direction.copy();
        vel.mult(this.speed);

        this.pos.add(vel);
        this.angle+= this.angleV;



        if(this.pos.x > width + this.r){
            this.pos.x = -this.r;
        }else if(this.pos.x < -this.r){
            this.pos.x = width+this.r;
        }else if(this.pos.y > height + this.r){
            this.pos.y = -this.r;
        }else if(this.pos.y < -this.r){
            this.pos.y = height + this.r;
        }

        this.checkCollision();

        this.display();
    }

    this.display = function(){
       /* push();
            fill(255);
            ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
        pop();*/

        push();
            translate(this.pos.x,this.pos.y);
            rotate(this.angle);
            beginShape();
            vertex(0,-this.r*2);
            vertex(-this.r,this.r*2);
            vertex(this.r,this.r*2);
            endShape(CLOSE);
        pop();

    }

    this.checkCollision = function(){
        for(var i = 0; i < asteroids.length; i++){
            var d = dist(this.pos.x,this.pos.y,asteroids[i].pos.x,asteroids[i].pos.y);

            if(d < this.r + asteroids[i].r){
                this.lives--;
                if(this.lives <=0){
                }else{
                    this.pos.x = width/2;
                    this.pos.y = height/2;
                    reset();
                }
            }
        }
    }

    this.applyPowerup = function(id){
        if(!this.hasPowerup(id)){
            this.effects.push(id);
            if(id == 1)
                setTimeout(this.removePowerup,10000,id); // Bullets loop through walls
            if(id == 2){
                setTimeout(this.removePowerup,12000,id); // Fire a bullet behind you
            }else if(id == 3){
                setTimeout(this.removePowerup,4500,id); // OP MODE
            }else if(id == 4){
                setTimeout(this.removePowerup,10000,id); // Penetrating shot
            }else if(id == 5){
                setTimeout(this.removePowerup,8000,id); //Triple shot
            }else if(id == 6){
                setTimeout(this.removePowerup,9000,id); //Freeze shot
            }else{
                setTimeout(this.removePowerup,8000,id);
            }
        }
    }

    this.removePowerup = function(id){
        for(var i = 0; i < this.effects.length; i++){
            if(this.effects[i] == id){
                this.effects.splice(i,1);
                return;
            }
        }
    }.bind(this);

    this.shoot = function(){
        var bulletVel = this.direction.copy();
        bulletVel.setMag(-8);
        bullets.push(new Bullet(this.pos.x,this.pos.y,bulletVel,this.effects));

        if(this.hasPowerup(2)){
            var bulletVel = this.direction.copy();
            bulletVel.setMag(8);
            bullets.push(new Bullet(this.pos.x,this.pos.y,bulletVel,this.effects));
        }if(this.hasPowerup(5)){
            var offset = PI/6;
            var v1 = createVector(this.direction.x * cos(offset) - (this.direction.y * sin(offset)), this.direction.x * sin(offset) + this.direction.y * cos(offset));
            var v2 = createVector(this.direction.x * cos(-offset) - (this.direction.y * sin(-offset)), this.direction.x * sin(-offset) + this.direction.y * cos(-offset));
            v1.setMag(-8);
            v2.setMag(-8);
            bullets.push(new Bullet(this.pos.x,this.pos.y,v1,this.effects));
            bullets.push(new Bullet(this.pos.x,this.pos.y,v2,this.effects));


        }

    }
    
    this.hasPowerup = function(id){
        for(var i = 0; i < this.effects.length; i++){
            if(this.effects[i] == id){
                return true;
            }
        }
        
        return false;
        
    }
}
