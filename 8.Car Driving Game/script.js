const score = document.querySelector(".score");
const startScreen = document.querySelector(".game__startScreen");
const playArea = document.querySelector(".game__playArea");

let road;
let carCor;
let car = document.createElement("div");

let keyPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

let player = { };

startScreen.addEventListener("click", startGame);

document.addEventListener("keydown", pressOn );

document.addEventListener("keyup", pressOff );

function startGame ( ) {
    player.start = true;
    player.score = 0;
    playArea.innerHTML = "";
    playArea.style.opacity = "1";
    startScreen.classList.add("hide");
    score.classList.remove("hide");
    road = playArea.getBoundingClientRect ( );
    car.setAttribute('class','car');
    playArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    roadLine ();
    addEnemyCars ();
    window.requestAnimationFrame (playGame);
}

function pressOn ( e ) {
    e.preventDefault( );
    keyPressed[e.key] = true;
}

function pressOff ( e ) {
    e.preventDefault( );
    keyPressed[e.key] = false;
}

function playGame ( ) {
    if(player.start) {
        if(keyPressed.ArrowUp && player.y>0) player.y -= 5;
        if(keyPressed.ArrowDown && player.y<(road.height - car.clientHeight)) player.y += 5;
        if(keyPressed.ArrowLeft && player.x>0) player.x -= 5;
        if(keyPressed.ArrowRight && player.x<(road.width - car.clientWidth)) player.x += 5;
        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';
        moveRoadLine();
        moveEnemyCars();
        moveSide();
        player.score ++;
        score.innerText = player.score;
        window.requestAnimationFrame (playGame);
    }
}

function roadLine () { 
    let topDis = 0;
    for ( let i = 0; i < 14; i++) {
        let lane = document.createElement("div");
        lane.classList.add("line");
        lane.style.top = topDis+'vh';
        playArea.appendChild(lane);
        topDis += 7.5;
    }
}


function moveRoadLine ( ) {
    
    let lineArray = document.querySelectorAll(".line");
    lineArray.forEach(element => {
              element.style.top = ((element.offsetTop+2)%road.height)+'px';
    });
}

function addEnemyCars () {
    let topDisCars = 0;
    let leftDiscars = 0;
    for ( let i = 0; i < 15; i++) {
        let enemyCars = document.createElement("div");
        enemyCars.classList.add("car__enemy");
        enemyCars.style.top = topDisCars+'px';
        enemyCars.style.left = leftDiscars+'px';
        enemyCars.style.backgroundImage = "url(images/car"+Math.floor(Math.random()*3)+".jpg";
        playArea.appendChild(enemyCars);
        topDisCars = (i+1)*400;
        leftDiscars = Math.floor(Math.random() * (road.width - enemyCars.clientWidth) );
   }

}


function moveEnemyCars ( ) {
    
    let carArray = document.querySelectorAll(".car__enemy");
    carArray.forEach(element => {
        if(carColiision(car, element)) endGame();
        element.style.top = ((element.offsetTop+3)% 6000)+'px';
    });
}

function carColiision ( car, enemycar) {
    carCor = car.getBoundingClientRect();
    let enemycarCor = enemycar.getBoundingClientRect();
    return !(
        ( carCor.bottom<enemycarCor.top) ||
        ( carCor.top>enemycarCor.bottom) ||
        ( carCor.right<enemycarCor.left) ||
        ( carCor.left>enemycarCor.right) 
    );
}

function endGame () {
    player.start = false;
    startScreen.innerText = "Game over!!";
    startScreen.classList.remove("hide");
    playArea.style.opacity = "0.9";
    let audio = new Audio("gameover.mp3");
    audio.play();
}

function moveSide () {
    let side = document.querySelector(".leftSide");
    side.style.top = (side.offsetTop)%road.height+2+'px';
    
    let topside = document.querySelector(".leftSide__top");
    if(topside.offsetTop > 0) {
        topside.style.top = '-'+topside.clientHeight+'px';
        side.style.top = 0+'px';
    }
    topside.style.top = (topside.offsetTop)+2+'px'; 
}