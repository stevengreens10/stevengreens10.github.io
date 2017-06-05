function Word(text){
  this.text = text;
  this.keys = [];
  this.map = new Map();
}


function Chain(){
  this.words = [];

  this.clear = function(){
    this.words = [];
  }

  //Adds the current word to the chain while keeping track of the word that comes after
  this.addWord = function(word,nextword){
    var word_obj = undefined;

    for(var i = 0; i < this.words.length; i++){
      if(this.words[i].text == word) word_obj = this.words[i];
    }


    if(!word_obj){
      word_obj = new Word(word);
      this.words.push(word_obj);
    }


    if(nextword){
      if(word_obj.map.get(nextword)){
        word_obj.map.put(nextword,word_obj.map.get(nextword)+1);
      }else{
        word_obj.map.put(nextword,1);
        word_obj.keys.push(nextword);
      }
    }
  }

  //Generates a string with numwords words by picking a random stored word and starting to chain words based on frequency
  this.create = function(numwords){
    var sentence = "";
    var current = this.words[Math.floor(random(this.words.length))];
    sentence+=current.text +" ";

    for(var i = 0; i < numwords; i++){
      var keyFreq = [];
      //Generates a frequency array so that words with highest count are more likely to be picked
      for(var j = 0; j < current.keys.length; j++){
        for(var k = 0; k < current.map.get(current.keys[j]);k++){
          keyFreq.push(current.keys[j]);
        }
      }

        var index = Math.floor(random(keyFreq.length));
        var word = keyFreq[index];
        sentence+=word +" ";
        var word_index = this.getIndex(word);
        if(word_index >= 0){
          current = this.words[word_index];
        }else{
          current = undefined;
        }
      if(!current){
        break;
      }

    }
    return sentence;
  }

  this.getIndex = function(word){
    for(var i = 0; i < this.words.length; i++){
      if(this.words[i].text == word){
        return i;
      }
    }
    return -1;
  }

}
