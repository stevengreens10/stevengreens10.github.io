function Horse(id){
    this.id = id;
    this.x = 20;
    this.forwardPercentage = 50 + (this.id * 2);
    
    this.update = function(){
        if(random(100) < this.forwardPercentage){
            this.x += ((width-40) / 200);
        }else{
            this.x -= ((width-40) / 200);
        }
        
        if(this.x >= (width-20) && won == false){
            print("Horse # " + this.id + " is the winner!");
            winnerP.html("Horse # " + this.id + " is the winner!");
            won = true;
            winners.push(this.id);
            
            setTimeout(reset,500);
        }
    }
    
    this.display = function(){
        var y = map(this.id,1,20,20,height-20);
        fill(255,0,0);
        rectMode(CENTER);
        rect(this.x,y,20,20);
        fill(0);
        textAlign(CENTER);
        text(this.id,this.x,y+5);
    }
}