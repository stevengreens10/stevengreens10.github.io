function Asteroid(x,y,r){
    this.pos = createVector(x,y);
    this.vel = p5.Vector.random2D();
    var speed = map(r,30,10,MINROCKV,MAXROCKV);
    this.vel.mult(speed);

    this.r = r;
    this.dead = false;

    this.update = function(){
        this.pos.add(this.vel);
        this.hit();

        if(this.pos.x > width + this.r){
            this.pos.x = -this.r;
        }else if(this.pos.x < -this.r){
            this.pos.x = width+this.r;
        }else if(this.pos.y > height + this.r){
            this.pos.y = -this.r;
        }else if(this.pos.y < -this.r){
            this.pos.y = height + this.r;
        }

        this.display();
    }

    this.display = function(){
        push();
            fill(255,255,255,0);
            stroke(255);
            ellipse(this.pos.x,this.pos.y,2*this.r,2*this.r);
        pop();
    }

    this.hit = function(){
        for(var i = bullets.length - 1; i >= 0; i--){
            var d = dist(this.pos.x,this.pos.y,bullets[i].pos.x,bullets[i].pos.y);

            if(d < this.r + 5){
                this.dead = true;
                if(bullets[i].effect != 4) bullets.splice(i,1);
                if(!cheating) score += round(this.r*5);
                if(this.r > 10){
                    asteroids.push(new Asteroid(this.pos.x,this.pos.y,this.r/2));
                    asteroids.push(new Asteroid(this.pos.x,this.pos.y,this.r/2));
                    if(random(100) < 50)
                        asteroids.push(new Asteroid(this.pos.x,this.pos.y,this.r/2));
                }

            }
        }
    }
}