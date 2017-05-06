function Powerup(x,y,id){
 this.pos = createVector(x,y);
 this.gotten = false;
 this.id = id;

 this.update = function(){
     this.checkCollision();
     this.display();
 }

 this.display = function(){
     push();
        if(this.id == 1){
            fill(255,0,125);
        }else if(this.id == 2){
            fill(0,255,0);
        }else if(this.id == 3){
            fill(226,224,66);
        }else if(this.id == 4){
            fill(100,200,100);
        }else if(this.id == 5){
            fill(200,100,100);
        }

        ellipse(this.pos.x,this.pos.y,20,20);
     pop();
 }

 this.checkCollision = function(){
     var d = dist(this.pos.x,this.pos.y,player.pos.x,player.pos.y);

     if(d < 10 + player.r){
         this.gotten = true;
         player.applyPowerup(this.id);
     }
 }
}
