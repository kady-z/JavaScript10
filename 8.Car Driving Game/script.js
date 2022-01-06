const score = document.querySelector(".score");
const startScreen = document.querySelector(".game__startScreen");
const playArea = document.querySelector(".game__playArea");

let road;

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
    startScreen.classList.add("hide");
    playArea.classList.remove("hide");
    road = playArea.getBoundingClientRect ( );
    window.requestAnimationFrame (playGame);
    let car = document.createElement("div");
    car.setAttribute('class','car');
    playArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    roadLane ();
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
    let car = document.querySelector(".car");
    if(player.start) {
        if(keyPressed.ArrowUp && player.y>0) player.y -= 5;
        if(keyPressed.ArrowDown && player.y<(road.height - car.clientHeight)) player.y += 5;
        if(keyPressed.ArrowLeft && player.x>0) player.x -= 5;
        if(keyPressed.ArrowRight && player.x<(road.width - car.clientWidth)) player.x += 5;
        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';
         window.requestAnimationFrame (playGame);
    }
}

function roadLane () { 
    let topDis = 0;
    for ( let i = 0; i < 14; i++) {
        let lane = document.createElement("div");
        lane.classList.add("line");
        lane.style.top = topDis+'vh';
        playArea.appendChild(lane);
        topDis += 8;
        console.log(topDis);
    }
}