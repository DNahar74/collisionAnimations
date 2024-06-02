const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = 800;
const canvasHeight = canvas.height = 650;

const animationImage = new Image();
animationImage.src = '../boom.png';

// OffsetX & offsetY give X and Y coordinates W.R.T. the current element unlike client X & Y
// canvas.addEventListener('click', (Event)=>{
//     console.log(Event.offsetX, Event.offsetY);
// })

const staggerFrames = 10;
const frames = 5;
const imageWidth = 1000;

let gameFrame = 0;

let sX = 0;
let sY = 0;
let sWidth = 200;
let sHeight = 179;

let dWidth = sWidth/2;
let dHeight = sHeight/2;
// let dX = Math.random()*(canvasWidth-dWidth);
// let dY = Math.random()*(canvasHeight-dHeight);

let dX = 0;
let dY = 0;

let isAnimating = false;

canvas.addEventListener('click', (Event)=>{
    dX = Event.offsetX - dWidth/2;
    dY = Event.offsetY - dHeight/2;

    sX = 0;
    sY = 0;

    gameFrame = 0;

    if (!isAnimating) {
        isAnimating = true;
        animate();
    }
})


function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    gameFrame%staggerFrames===0 ? sX = (sX + sWidth)%imageWidth : sX+=0;

    ctx.drawImage(animationImage, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
    gameFrame++;
    
    if (gameFrame / staggerFrames < frames-1) {
        requestAnimationFrame(animate);
    } else {
        isAnimating = false;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
}

// console.log(dX, dY);

// animate();