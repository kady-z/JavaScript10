const button = document.querySelector("button");
const output = document.querySelector(".output");

button.addEventListener("click", () => {
    button.style.backgroundColor = "blue";
    setTimeout( () => {
        button.style.backgroundColor ="white";
    },1000)
    const cost = document.querySelector("input").value;
    let tip = (cost*0.15).toFixed(2);
    output.innerText = " Your tip is : $"+tip;
})
