let myCalculator = document.querySelector(".myCalc");
const myKeys = [[ '+/-', '0', '.', '=' ], [ '1', '2', '3', '+' ], [ '4', '5', '6', '-' ], [ '7', '8', '9', '*' ], [ 'C', '( )', '%', '/' ]];
const operators = ['+', '-', '*', '/'];
let outputArea;

document.addEventListener("DOMContentLoaded", function () {
    outputArea = document.createElement("div");
    outputArea.innerHTML = '0';
    outputArea.classList.add("output");
    myCalculator.appendChild(outputArea);
    for( let i=myKeys.length-1; i>=0; i--) {
        let div = document.createElement("div");
        div.classList.add("row");
        for( let j=0; j<myKeys[i].length; j++) {
            let div_btn = document.createElement("div");
            div_btn.innerHTML = myKeys[i][j];
            div_btn.classList.add("btn");
            div_btn.addEventListener("click",btnhit);
            div.appendChild(div_btn);
        }
        myCalculator.appendChild(div);
    }
 });

 function btnhit(e) {
     var myAudio = new Audio(`beep-08b.wav`);
     myAudio.play();
     let valueOne = this.innerText;
     let myCal = outputArea.innerText;
     if(myCal=='0') myCal="";
     if(valueOne == "=") myCal = eval(myCal);
     else {
        let lastChar = myCal.substring(myCal.length-1);
        if(operators.includes(valueOne)) {
            if(operators.includes(lastChar)){
                myCal = myCal.substring(0,myCal.length-1);
            }
            else myCal = eval(myCal);
        }
        myCal+= valueOne;
     }
     if(valueOne == 'C') myCal =0;    
    outputArea.innerText = myCal;
 }
