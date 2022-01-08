document.querySelector("button").addEventListener("click",playAgain);

function playAgain() {
    document.querySelector(".img1").classList.remove("winner__display");
    document.querySelector(".img2").classList.remove("winner__display");

    var playerOneDiceValue = Math.floor(Math.random()*6)+1; 
    var playerTwoDiceValue = Math.floor(Math.random()*6)+1;

    img__adder( playerOneDiceValue, document.querySelector(".img1"));
    img__adder( playerTwoDiceValue, document.querySelector(".img2"));

    winnerDisplay ( playerOneDiceValue, playerTwoDiceValue );
}

function img__adder ( number, playerImage ) {
        playerImage.setAttribute("src","images/dice"+number+".png");
}

function winnerDisplay ( playerOneDiceValue, playerTwoDiceValue ) {
    if(playerOneDiceValue === playerTwoDiceValue) {
        document.querySelector("h1").textContent = "Tie !!!";
    } else if(playerOneDiceValue >= playerTwoDiceValue) {
        document.querySelector("h1").textContent = "Player 1 Wins !!!";
        document.querySelector(".img1").classList.add("winner__display");
    } else {
        document.querySelector("h1").textContent = "Player 2 Wins !!!";
        document.querySelector(".img2").classList.add("winner__display");
    }
}

