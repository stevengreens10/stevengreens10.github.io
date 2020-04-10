function createExpandingTree(list) {
  let root = new Node(null, "", -1);
  let currentParent = root;
  lines = list.split("\r\n");
  
  for(let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let trimLine = line.trim();
    let level = line.length - trimLine.length;
    
    if(level <= currentParent.level) {
      let oldParent = currentParent;
      let levelDiff = currentParent.level - level;
      for(let i = 0; i < levelDiff + 1; i++) {
        if(currentParent.parentNode == null) {
          console.log("Uh oh");
          console.log(oldParent);
          console.log(line);
          console.log(level);
          console.log(levelDiff);
        }
        currentParent = currentParent.parentNode;
      }
    }
    
    let node = new Node(currentParent, trimLine, level);
    currentParent.children.push(node);
    currentParent = node;
  }
  
  
  return root;
}

class Node {
  constructor(parentNode, text, level) {
    this.parentNode = parentNode;
    this.text = text;
    this.level = level;
    this.children = [];
  }
  
}