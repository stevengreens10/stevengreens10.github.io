function Player(){
    this.p; //specifies player
    this.s = round(random(col*row));
    
    this.start = function(){
        nodes[this.s].state = 1;
    }
}
