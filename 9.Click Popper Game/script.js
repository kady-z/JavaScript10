const playArea = { };
const player = { };

let gameObj;

playArea.stats = document.querySelector(".stats");
playArea.main = document.querySelector(".main");
playArea.game = document.querySelector(".main");
playArea.btn = Array.from(document.querySelectorAll(".btn"));
playArea.page = Array.from(document.querySelectorAll(".page"));

player.score = 0;
player.items = 3;

document.addEventListener("DOMContentLoaded", getData);

function getData () {
    fetch("https://api.myjson.com/bins/gungm")
    .then ( function (rep) {
        return rep.json();
      } ) 
    .then( function (data) {
        gameObj = data.data;
        console.log(gameObj);
      } )
}
 
playArea.btn.forEach(function (btn) {
    btn.addEventListener("click", handleBtn);
});

function handleBtn (btn) {
    console.log(btn.target);
    if(btn.target.classList.contains("newGame")) {
        startGame ();
    }
}

function startGame () {

}