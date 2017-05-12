function Player(){
    this.pos = createVector(width/2,height/2);
    this.maxSpeed = 2;
    this.speed = 0;
    this.r = 5;
    this.lives = 3;
    this.angle = 0;
    this.direction = createVector(cos(this.angle + PI/2),sin(this.angle + PI/2));
    this.angleV = 0;
    this.powerup = 0;
    this.effects = [];
    this.invincible = false;

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
            fill(255);

            if(this.hasPowerup(7))
              fill(0,255,0);

            if(this.hasPowerup(8)){
                push();
                stroke(219, 61, 179);
                strokeWeight(1.5);
                noFill();

                ellipse(this.pos.x,this.pos.y,(this.r+11)*2,(this.r+11)*2);
                pop();
            }

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
                if(this.invincible == false){
                  this.lives--;

                  if(this.lives <= 0) gameOver();

                  background(255,0,0,200);
                  this.invincible = true;
                  setTimeout(this.removeInvincibility,1000);
                }else{
                    if(this.hasPowerup(8) && !this.hasPowerup(7)){
                        this.removePowerup(8);
                        setTimeout(this.removeInvincibility,1000);
                    }
                }

                if(!cheating) score += round(asteroids[i].r*5);

                  if(asteroids[i].r > 10){
                    asteroids.push(new Asteroid(asteroids[i].pos.x,asteroids[i].pos.y,asteroids[i].r/2));
                    asteroids.push(new Asteroid(asteroids[i].pos.x,asteroids[i].pos.y,asteroids[i].r/2));
                    if(random(100) < 50)
                      asteroids.push(new Asteroid(asteroids[i].pos.x,asteroids[i].pos.y,asteroids[i].r/2));
                  }
                    asteroids.splice(i,1);
                  return;
                //}
                /*if(this.lives <=0){
                }else{
                    this.pos.x = width/2;
                    this.pos.y = height/2;
                    reset();
                }*/
            }
        }
    }

    this.removeInvincibility = function(){
        if(!this.hasPowerup(7) && !this.hasPowerup(8)){
            this.invincible = false;
        }
    }.bind(this);

    this.applyPowerup = function(id){

        /*  1 - Continuum
            2 - Double shot
            3 - OP Mode
            4 - Piercing
            5 - Triple shot
            6 - Freeze shot
            7 - Invincibility + contact damage
            8 - Bounce off asteroids
        */


        var durations = [0 /*0*/,10000 /*1*/,12000 /*2*/,4500 /*3*/,10000 /*4*/,8000 /*5*/,9000 /*6*/,12000 /*7*/,-1 /*8*/];

        if(!this.hasPowerup(id)){
            this.effects.push(id);
            if(id == 7){
                this.invincible = true;
                this.maxSpeed = 4;
                if(this.speed < 0){
                  this.speed = -this.maxSpeed;
                }else if(this.speed > 0){
                  this.speed = this.maxSpeed;
                }
            }else if(id == 8){
                 this.invincible = true;
             }

            if(durations[id] != -1)
                setTimeout(this.removePowerup,durations[id],id);
        }
    }

    this.removePowerup = function(id){

      if(id == 7){
        setTimeout(this.removeInvincibility,2000);
        this.maxSpeed = 2;
        if(this.speed < 0){
          this.speed = -this.maxSpeed;
        }else if(this.speed > 0){
          this.speed = this.maxSpeed;
        }
      }

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
        bullets.push(new Bullet(this.pos.x,this.pos.y,bulletVel,this.effects.slice()));

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
            bullets.push(new Bullet(this.pos.x,this.pos.y,v1,this.effects.slice()));
            bullets.push(new Bullet(this.pos.x,this.pos.y,v2,this.effects.slice()));


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
