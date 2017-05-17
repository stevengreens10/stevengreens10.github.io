function Player(num){
    this.p = num; //specifies player
    this.s = round(random(col*row));  
    this.start = function(){
        nodes[this.s].state = 1;
        nodes[this.s].owners.push(this.p);
    }
}
