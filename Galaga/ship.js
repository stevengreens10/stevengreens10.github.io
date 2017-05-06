function Ship(){
    this.pos = createVector(width/2,height-50);
    this.w = 20;
    this.h = 50;
    this.hp = 3;
    this.speed = 4;
    this.vel = createVector(0,0);
    
    this.update = function(){
        this.pos.add(this.vel);
        this.pos.x = constrain(this.pos.x,this.w/2,width-this.w/2);
        this.display();
        
    }
    
    this.display = function(){
        fill(255);
        if(this.hp <= 0) fill(255,0,0);
        rect(this.pos.x-this.w/2,this.pos.y-5,this.w,this.h);
    }
}