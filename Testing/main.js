function setup(){
    noCanvas();
    var video = createCapture(VIDEO);
    video.play();
}

function deviceTurned(){
  createP("Device turned");
}

function deviceMoved(){
  createP("Device Moved");
}

function deviceShaken(){
  createP("Device Shaken");
}
