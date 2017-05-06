function Enemy(x,y,id){
    this.pos = createVector(x,y);
    this.vel = createVector(3 ,0);
    this.bullets = [];
    this.r = 10;
    this.id = id;
    this.randomShoot = int(random(100,150));
    
    this.update = function(){
        this.pos.add(this.vel);
        this.display();
        
        if(this.hits(ship)){
            ship.hp--;
        }
        if(id == 1 && frameCount % this.randomShoot == 0){
            this.shoot();
        }
        
        for(let i = this.bullets.length-1; i >=0; i--){
                this.bullets[i].update();
                
                if(this.bullets[i].isOffScreen()){
                    this.bullets.splice(i,1);
                }
             }
    }
    
    this.move = function(){
        this.vel.x*=-1;
    }
    
    this.hits = function(ship){
        for(var i =0; i < this.bullets.length; i++){
            var bullet = this.bullets[i];
            var d = ship.pos.dist(bullet.pos);
            return (d < 7 + bullet.r);
            
            
        }
    }
    
    this.display = function(){
        colorMode(HSB);
        if(this.id == 0){
            fill(122,100,100);
        }else if(this.id == 1){
            fill(200,100,100);
        }
        
        ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
        colorMode(RGB);
    }
    
    
    this.shoot = function(){
        this.bullets.push(new EnemyLaser(this.pos.x,this.pos.y));
    }
    
    
}