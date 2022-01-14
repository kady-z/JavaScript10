    let Keys = {};
    let players = {};
    let birdie;
const scoreScreen = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const gameMsg = document.querySelector(".gameMessage");

gameMsg.addEventListener("click", start);
startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function start () {
    gameArea.innerHTML = "";
    players.score = 0;
    players.gamestat = true;
    gameMsg.classList.add("hide");
    startScreen.classList.add("hide");
    bird ();
    birdie = document.querySelector(".bird");
    players.pipe = 0;
    let spacing = 500;
    let pipeNum = Math.floor((gameArea.offsetWidth) / spacing);
    for( let i =0 ; i<pipeNum; i++) {
        buildPipes(players.pipe * spacing);
    }
    window.requestAnimationFrame(playGame);
}

function playGame () {
    if(players.gamestat) {
        movePipes ();
        players.x = birdie.offsetLeft;
        players.y = birdie.offsetTop;
        if((Keys.ArrowUp || Keys.Space ) && players.y>scoreScreen.clientHeight) players.y -=6;
        if((!Keys.ArrowUp && !Keys.Space ) && players.y>=scoreScreen.clientHeight && players.y<gameArea.clientHeight-birdie.clientHeight) players.y +=10;
        if(Keys.ArrowDown && players.y<gameArea.clientHeight - birdie.clientHeight) players.y += 6;
        if(Keys.ArrowLeft && players.x>0) players.x -= 6;
        if(Keys.ArrowRight && players.x<gameArea.clientWidth - birdie.clientWidth) players.x += 6;
        birdie.style.top = players.y + 'px';
        birdie.style.left = players.x + 'px';
        if(players.y>gameArea.clientHeight-birdie.clientHeight) {
            gameOver ();
        }
        players.score++;
        scoreScreen.innerHTML = "Score: "+players.score;
        window.requestAnimationFrame(playGame);
    }
}

function buildPipes (startPos) {
    let totalHeight = gameArea.offsetHeight;
    let totalWidth = gameArea.offsetWidth;
    players.pipe++; 
    let pipe1 = document.createElement("div");
    pipe1.start = startPos + totalWidth;
    pipe1.classList.add("pipe");
    pipe1.height = Math.floor(Math.random()*600)+50;
    pipe1.style.height = pipe1.height + 'px';
    pipe1.style.left = pipe1.start + 'px';
    pipe1.style.top = '0';
    gameArea.appendChild(pipe1);
    let pipeSpace = Math.floor(Math.random()*50)+150;
    let pipe2 = document.createElement("div");
    pipe2.classList.add("pipe");
    pipe2.height = totalHeight - pipeSpace ;
    pipe2.height -= pipe1.height; 
    pipe2.style.height = pipe2.height + 'px';
    pipe2.style.left = pipe1.start + 'px';
    pipe2.style.bottom = '0';
    gameArea.appendChild(pipe2);
}

function movePipes () {
    let pipe = Array.from(document.querySelectorAll(".pipe"));
    pipe.forEach(function (item) {
        let itemLeft = item.offsetLeft;
        if(isCollide(item)) {
            gameOver ();
        }
        else if(itemLeft<0) item.style.left = 100+'vw';
        else item.style.left = itemLeft - 2 +'px';
        console.log(itemLeft);
    });
}

function isCollide(item) {
    let itemDimen = item.getBoundingClientRect();
    let birdDimen = birdie.getBoundingClientRect();
    return (
        (itemDimen.left<birdDimen.right) &&
        (itemDimen.right>birdDimen.left)  &&
        (itemDimen.bottom>birdDimen.top)  && 
        (itemDimen.top<birdDimen.bottom)  
    )
} 

function gameOver () {
    players.gamestat = false;
    gameMsg.classList.remove("hide");
    birdEnd();
    gameMsg.innerHTML= "Game Over";
}

function pressOn (e) {
    e.preventDefault();
    Keys[e.code] = true;
}

function pressOff (e) {
    e.preventDefault();
    Keys[e.code] = false;
}

function bird () {
    let bird = document.createElement("div");
    bird.setAttribute("class","bird");
    let wings = document.createElement("span");
    wings.setAttribute("class","wings");
    let legOne = document.createElement("span");
    legOne.setAttribute("class","legOne");
    let legTwo = document.createElement("span");
    legTwo.setAttribute("class","legTwo");
    let eyeOne = document.createElement("span");
    eyeOne.setAttribute("class","eyeOne");
    let eyeTwo = document.createElement("span");
    eyeTwo.setAttribute("class","eyeTwo"); 
    let eyeDot = document.createElement("span");
    eyeDot.setAttribute("class","eyeDot");
    let beak = document.createElement("span");
    beak.setAttribute("class","beak");
    eyeOne.appendChild(eyeDot);
    bird.appendChild(legOne);   
    bird.appendChild(legTwo);   
    bird.appendChild(eyeOne);   
    bird.appendChild(eyeTwo);   
    bird.appendChild(wings);
    bird.appendChild(beak);
    gameArea.appendChild(bird);

}

function birdEnd () {
    let wings = document.querySelector(".wings"); 
    wings.style.animationPlayState = 'paused';
    birdie.style.animationPlayState = 'paused';
    let eyesDot = document.querySelector(".eyeDot");
    let eye = document.querySelector(".eyeTwo");
    eyesDot.style.backgroundColor = 'red';
    eye.style.backgroundColor = 'red';
}