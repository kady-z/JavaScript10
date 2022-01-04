let myBlock;
let functionList;
let fun= [];
document.addEventListener("DOMContentLoaded", () => {
    myBlock= document.createElement("div");
    myBlock.textContent = "Hello World!";
    
    myBlock.style.width = "100px";
    myBlock.style.height = "100px";
    myBlock.style.backgroundColor = "red";
    myBlock.style.color = "white";
    myBlock.style.textAlign = "center";
    myBlock.style.lineHeight = "100px";
    myBlock.style.position = "absolute";
    myBlock.style.top = "100px";
    myBlock.style.left = "100px";
    
    document.body.appendChild(myBlock);

    functionList = document.createElement("div");
    document.body.appendChild(functionList);
});

function goLeft() {
    let left = myBlock.offsetLeft;
    left-=50;
    myBlock.style.left = left+"px";
}

function goRight() {
    let left = myBlock.offsetLeft;
    left+=50;
    myBlock.style.left = left+"px"; 
}

function goUp() {
    let Top = myBlock.offsetTop;
    Top-=50;
    myBlock.style.top = Top+"px";
}

function goDown() {
    let Top = myBlock.offsetTop;
    Top+=50;
    myBlock.style.top = Top+"px";
}

document.addEventListener("keydown", function(e) {
    e.preventDefault();
    let btnKey = e.keyCode;
    if(btnKey===38) addFun("Up"); 
    if(btnKey===40) addFun("Down");
    if(btnKey===39) addFun("Right");
    if(btnKey===37) addFun("Left");
    if(btnKey===67){
        myBlock.style.backgroundColor = randomColor();
    }  
    if(btnKey === 13 || btnKey === 32) mover();
});

function addFun (val) {
    let span = document.createElement("span");
    span.textContent = '+'+ val;
    span.style.border=" 2px solid black";
    span.style.padding ="0.5rem";
    span.style.margin="0.5rem";
    span.addEventListener("mouseover", function () {
       this.style.backgroundColor="red";
    });
    span.addEventListener("mouseout", function () {
        this.style.backgroundColor="white";
     });
    functionList.appendChild(span);
    fun.push(span);
}

function randomColor () {
    let randomNum = Math.random().toString(16); 
    return "#"+randomNum.substring(randomNum.length-6);
}

function mover() {
  if(fun.length>0) {
      let cmd = fun.shift();
      let item = cmd.textContent.replace("+","");
      myBlock.innerHTML = "Move: "+item;
      functionList.removeChild(cmd);
      if(item === "Left") goLeft();
      if(item === "Right") goRight();
      if(item === "Up") goUp();
      if(item === "Down") goDown();
      setTimeout(mover,3000);
  }  
  else myBlock.innerHTML = "Set Path" ;
}