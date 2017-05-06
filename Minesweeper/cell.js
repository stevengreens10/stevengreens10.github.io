// State 0 = Normal Cell
// State 1 = Unclicked Mine
// State 2 = Clicked Cell
// State 3 = Clicked Mine

function Cell(state,x,y){
    this.state = state;
    this.x = x;
    this.y = y;
    this.flagged = false;
    
    this.display = function(){
        
        if(this.state == 0 || this.state == 1){
            fill(100, 153, 239);
        }else if(this.state == 2){
            fill(180, 206, 247);
        }else if(this.state == 3){
            fill(255,0,0);
            dead = true;
        }
        
               
        rect(this.x*scl,this.y*scl,scl,scl);
        
        if(this.flagged){
            fill(255,0,0);
            ellipse((this.x*scl) + scl/2+1,(this.y*scl) + scl/2,scl/2,scl/2);
        } 
    }
}