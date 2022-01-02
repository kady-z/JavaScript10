const popup = document.querySelectorAll(".popup");
const output = document.querySelector(".output");

for(let i=0; i<popup.length;i++) {
    popup[i].addEventListener("click", () => {
        let message = this.getAttribute("data-message");
        document.querySelector(".message").innerText = message;
        output.classList.remove("hide");
    })
}

document.querySelector(".close").addEventListener("click", () =>{
    output.classList.add("hide");
});