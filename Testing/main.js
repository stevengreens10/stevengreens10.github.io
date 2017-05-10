function setup(){
    noCanvas();
}

function deviceTurned(){
    createP("Turn");
}

function mousePressed(){
    createP("Click");
    return false;
}
