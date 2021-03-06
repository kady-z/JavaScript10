const playArea = { };
const player = { };

let emojis = [0x1F600,0x1F604,0x1F605,0X1F606,0X1F602,0X1F609, 0X1F607, 0X1F617,0X1F619, 0X1F61D, 0X1F60E, 0X1F913, 0X1F9D0, 0X1F973, 0X1F60D, 0X1F972];

playArea.stats = document.querySelector(".stats");
playArea.main = document.querySelector(".main");
playArea.game = document.querySelector(".game");
playArea.btn = Array.from(document.querySelectorAll(".btn"));
playArea.page = Array.from(document.querySelectorAll(".page"));

player.score = 0;
player.items = 3;

document.addEventListener("DOMContentLoaded", getData);

function getData () {
    playArea.main.classList.add("visible");
    buildBoard ();
}

function updateScore () {
    playArea.scorer.innerHTML = "Score: " + player.score +"<br>"+ "Lives: "+player.items + "<br>" + "&#" + Math.floor(Math.random()*60 + 128512);
}

function buildBoard () {
    playArea.scorer = document.createElement("span");
    playArea.scorer.innerHTML = "Score: 0"+"<br>"+ "Lives: "+player.items;
    playArea.stats.appendChild(playArea.scorer);
    playArea.stats.style.color = "#fff";
    let rows = 4;
    let cols = 4;
    let count = 0;
    playArea.game.style.width = cols*108 + (cols*2) + 'px';
    playArea.game.style.margin = "auto";
    for (let i=0; i< rows ; i++) {
        const divRow = document.createElement("div");
        divRow.setAttribute('class','row');
        divRow.style.width = cols*108+(cols*2)+'px';
        divRow.style.margin = "auto";
        for (let j=0; j< cols ; j++) {
            const divColEle = document.createElement("div");
            divColEle.setAttribute('class','pop');
            count++;
            divColEle.innerText = count;
            divColEle.count = count;
            divRow.appendChild(divColEle);
        }
        playArea.game.appendChild(divRow);
    }
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
    player.score = 0;
    player.items = 3;
    playArea.main.classList.remove("visible");
    playArea.game.classList.add("visible");
    player.gameOver = false;
    startPop ();
}

function startPop () {
    let newPop = randomUp();
    newPop.classList.add("active");
    newPop.old = newPop.innerText;
    newPop.addEventListener("click", hitPop);
    const time = Math.round(Math.random()*1500 + 750);
    const iconVal = Math.floor(Math.random()*emojis.length);
    let iconContainer = document.createElement("span");
    iconContainer.innerHTML = String.fromCodePoint(emojis[iconVal]);
    iconContainer.style.position= "absolute";
    iconContainer.style.top = 25+'%';
    newPop.appendChild(iconContainer);
        playArea.inPlay = setTimeout( function () {
        newPop.classList.remove("active");
        newPop.removeEventListener("click", hitPop);
        newPop.innerText = newPop.old;
        player.items--;
        if(player.items<0) gameOver();
        if(!player.gameOver) {
            updateScore();
            startPop ();
        }

    }, time);
}

let popper;

function randomUp () {
    let pops = document.querySelectorAll(".pop");
    let index = Math.floor(Math.random () *pops.length);
    
    if(pops[index].count == playArea.last ) return randomUp();
    playArea.last = pops[index].count;
    popper = pops[index];
    return pops[index];
}

function hitPop (e) {
    updateScore();
    player.score += popper.count;
    popper.classList.remove("active");
    popper.removeEventListener("click", hitPop);
    popper.innerText = popper.old;
    clearTimeout(playArea.inPlay);
    if(!player.gameOver) 
        startPop ();
}

function gameOver() {
    player.gameOver = true;
    playArea.main.classList.add("visible");
    playArea.game.classList.remove("visible");
    document.querySelector(".newGame").innerText = "Try Again";
}