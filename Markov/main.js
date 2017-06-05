window.onload = setup;
var chain;
function setup(){
  chain = new Chain();
}

function createChain(){

  var string = document.getElementById("input").value;//LOAD CREEPYPASTA HERE
  var words = string.split(" ");
  for(var i = 0; i < words.length; i++){
    var nextword = undefined;
    if(i < words.length-1){
      nextword = words[i+1];
    }
    if(nextword)
      chain.addWord(words[i],nextword);
  }
  //Create a chain with 100 words
  console.log(chain.create(100));
}

function random(min, max){
  if(arguments.length == 1){
    max = min;
    min = 0;
  }

  return (Math.random() * (max-min) + min);
}
