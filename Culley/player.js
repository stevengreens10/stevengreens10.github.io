function Player(player){
    this.p = player; //specifies player
    this.s = round(random(col*row));
    this.b = getIndex(round(random(3,col-3)),round(random(3,row-3))); //base location
    
    this.start = function(){
        nodes[this.s].state = this.p;
    }
    this.base = function(){
        
    }
}
