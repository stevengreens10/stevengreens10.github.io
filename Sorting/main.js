var nums;
var n = 100;
var swaps = 0;
var k =1;
var sorted = false;
var newArray = false;
var slider;
var p;
var range = 10000;
var comparisons = 0;
var maxNums = 1000;
var bubble = false
var insertion = false;
var quick = false;

function setup(){
    createCanvas(640,480);

    frameRate(10);

    nums = new Array(n);

    for(var i = 0; i < nums.length;i++){
        nums[i] = int(random(0,range));
    }

    createElement("br");
    createElement("span", "Set number of values to sort: ");
    slider = createSlider(2,maxNums,n);
    p = createP( slider.value() + " values");

}

function draw(){
    background(0);
    noStroke();
    swaps = 0;
    p.html(slider.value() + " values");

   // Bubble sorting
   if(bubble == true){
       //Goes from 0 to k, since the k amount of values from the end are already sorted in bubble sort
       for(var i = 0; i < nums.length-k; i++){
           //Every time through the loop, if the one next to the current index is less, they are swapped.
                if(nums[i+1]<nums[i]){
                    nums = swap(nums,i+1,i);
                    swaps++;
                }
                comparisons++;

            }
            if(swaps == 0){
                sorted = true;
            }


    k++;
   }


   //Insertion sorting
   if(insertion == true){
    var swapped = false;
    if(k < nums.length){
        var num = nums[k];
        //J starts at the current index - 1 and goes to zero.
        var j = k-1;
        //Every time through the loop, all elements to the left of k are sorted and resorted the next time
        while(j >= 0 && num < nums[j]){
            nums = swap(nums,j,j+1);
            j--;
            comparisons++;
            swapped = true;
        }
        if(swapped == false){
            comparisons++;
        }
    }

    k++;


   }

   if(quick == true){

   }
    // Rendering rectangles
    var w = float(width/nums.length);

    for(var i = 0; i < nums.length; i++){
        var x = i*w;
        var y =height;
        var h = map(nums[i],0,range,0,-1*height);
        if((k > nums.length && insertion == true) ||((sorted || i > nums.length - k) && bubble == true)){
            fill(0,255,0);
        }else{
            fill(255);
        }

        rect(x,y,w,h);

        if(insertion == true){
            fill(255,0,0);
            rect(k*w,height,w,-height);
        }
        push();
        stroke(0);
        fill(0,200,100);
        text("# of Comparisons: " + comparisons, 20, 20);
        text("BubbleSort: " + bubble,20,40);
        text("InsertionSort: " + insertion,20,60);
        //text("QuickSort: " + quick,20,80);
        pop();

    }

}

function keyPressed(){
    if(key == 'R'){
        n = slider.value();
        nums = new Array(n);
        for(var i = 0; i < nums.length;i++){
            nums[i] = int(random(0,range));
        }
    }else if(key == 'B'){
        bubble = !bubble;
        if(bubbleSort){
            insertion = false;
            quick = false;
        }
    }else if(key == 'I'){
         insertion = !insertion;
         if(insertion){
             bubble = false;
             quick = false;
         }
     }else if(key == 'Q'){
         quick = !quick;
         if(quick){
             insertion = false;
             bubble = false;
         }
     }else{
         return;
     }

     sorted =false;
     k = 1;
     comparisons = 0;
}

function swap(array,i1,i2){
    var temp = array[i1];
    array[i1] = array[i2];
    array[i2] = temp;
    return array;
}


// Comparisons = (n^2 - n) /2
function bubbleSort(array){
    for(var k = 1; k < array.length-1;k++){
        for(var i = 0; i < array.length-k; i++){
            if(array[i+1]<array[i]){
                        array = swap(array,i+1,i);
                        swaps++;
                    }
                    comparisons++;
                    print(swaps);
                    if(swaps === 0){
                        sorted = true;
                        break;
                    }
                }
           if(sorted){
               break;
           }

        }
    return array;
}
