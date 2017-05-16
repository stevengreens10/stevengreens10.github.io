function Player(playernumber){
    this.p; //specifies player
    this.s = round(random(col*row));
    this.c;
    
    if(playernumber == 1){
        this.c = color(255,0,0);
    }else{
        this.c = color(0,0,255);   
    }
    
    this.start = function(){
        nodes[this.s].state = 1;
    }
}
