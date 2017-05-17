function Player(num){
    this.p; //specifies player
    this.s = round(random(col*row));
    this.number = num;
    
    this.start = function(){
        nodes[this.s].state = 1;
        nodes[this.s].owners.push(this.number);
    }
}
