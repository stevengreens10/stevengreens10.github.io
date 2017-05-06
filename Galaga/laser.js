function Laser(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,-10);
    
    this.update = function(){
        this.pos.add(this.vel);
        this.display();
    }
    
    this.display = function(){
        fill(255,0,0);
        rect(this.pos.x-5,this.pos.y,10,20);
    }
    
    this.isOffScreen = function(){
        return this.pos.y <= -20;
    }
    
    this.touching = function(enemy){
        var d = this.pos.dist(enemy.pos);
        return (d < 20);
    }
}