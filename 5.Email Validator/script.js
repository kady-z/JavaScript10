const rawText = document.querySelector("textarea[name=textarea]");
const emailText = document.querySelector("textarea[name=emailarea]");
const btn = document.querySelector("button");
let emailNumber = document.querySelector("span");
btn.addEventListener("click", function (){
    let temp = rawText.value;
    let exp = /\S+@\S+\.\S+/g;
     let emailList= temp.match(exp);
     let holder = [];
     for(let i =0; i<emailList.length; i++) {
         if(holder.includes(emailList[i])) continue;
         else holder.push(emailList[i]);
     }
     emailText.value = holder.join(", ");
    emailNumber.innerHTML = holder.length;
});