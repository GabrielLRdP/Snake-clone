// canvas config

let a = 0;
let canvas = document.querySelector("canvas");
canvas.width = 600;
canvas.height = 600;
let c = canvas.getContext("2d");
c.fillStyle ="rgba (0, 0, 0, 1)";
c.fillRect (0,0,canvas.width,canvas.height);

// configuration 

let snake = [];
let key = ""
let squareSize = canvas.width/40;
let fps = 10;
let stop = false;
let minx = 0;
let miny = 0;
let maxx = canvas.width;
let maxy = canvas.height;
let snakeHead;
let food;
let score =0;

//interactivity

window.addEventListener("keydown", function(event){

    console.log(event);
    key = event.key;
})

//functions 

function gameOver(x,y,snake) {

    let gameOver = false;

    if (x <0 || x >= canvas.width || y <0 || y >= canvas.height){
        gameOver = true;
    }

    for (let i = 1; i<snake.length; i++){
        if (snakeHead.x == snake[i].x && snakeHead.y == snake[i].y){
            gameOver = true;
        }
    }
    return gameOver;
}

function drawGameOver (stop){
    if (stop){
        c.beginPath();
        c.font = "50px 04B11";
        c.fillStyle = "rgba(255, 255, 255, 1)";
        c.textAlign = "center";
        c.fillText("Game Over", 300,300);
        c.fillStyle = "rgba(0, 0, 0, 1)";
    }
};


function eating (snakeHead,food){
    if (snakeHead.x == food.x && snakeHead.y == food.y){
        score ++;
        fps ++;
        snake.push(new SnakePart(snake[snake.length-1].x,snake[snake.length-1].y,0,0));
        food.generate();
    }
}

function drawTail (snake){
    for (let i = snake.length ;i>1 ;i--){
        snake[i-1].x = snake [i-2].x;
        snake[i-1].y = snake [i-2].y;
        snake[i-1].draw();
    }
}

function drawScore (score){

    let message = score.toString();
    message = "Score : "+message;
    c.beginPath();
    c.font = "15px 04B11";
    c.fillStyle = "rgba(255, 255, 255, 1)";
    c.textAlign = "center";
    c.fillText(message, 40,20);
    c.fillStyle = "rgba(0, 0, 0, 1)";
}

//classes

function SnakePart (x,y,dx,dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

    this.draw = function(){
        c.beginPath();
        c.fillStyle = "rgba(62, 190, 56, 1)";
        c.fillRect (this.x,this.y,squareSize,squareSize);
        c.fillStyle = "rgba(0,0,0,1)"
    }

    this.update = function (){

        if (key == "ArrowUp"){
            if (this.dy != 1) {
                this.dy = -1;
                this.dx = 0;
            }
        }
        if (key == "ArrowDown"){
            if (this.dy != -1) {
            this.dy = 1;
            this.dx = 0;
            }
        }
        if (key == "ArrowLeft"){
            if (this.dx != 1) {
            this.dy = 0;
            this.dx = -1;
            }
        }
        if (key == "ArrowRight"){
            if (this.dx != -1) {
            this.dy = 0;
            this.dx = 1;
            }
        }

        this.x+= this.dx*squareSize;
        this.y += this.dy*squareSize;

        if (this.x <0 || this.x > canvas.width || this.y <0 || this.y > canvas.height){
            return;
        }
        this.draw();
    }
}

function Food () {

    this.generate = function () {
        this.x = Math.floor(Math.random()*(canvas.width/squareSize))*squareSize;
        this.y = Math.floor(Math.random()*(canvas.height/squareSize))*squareSize;
    }

    this.draw = function () {
        c.beginPath();
        c.fillStyle = "rgba(238, 8, 8, 0.8)";
        c.fillRect (this.x,this.y,squareSize,squareSize);
        c.fillStyle = "rgba(0,0,0,1)"
    }  
}

// initialisation

function init(){

    snake.push(new SnakePart(squareSize*10,squareSize*10,0,0));
    snakeHead = snake [0];
    snake[0].draw();
    food = new Food;
    food.generate();
    food.draw();
    console.log(food);
}

// animation 

function animate (){

    c.clearRect(0,0,innerWidth,innerHeight);
    c.fillStyle ="rgba (0, 0, 0, 1)";
    c.fillRect (0,0,canvas.width,canvas.height);

    drawTail(snake);
    snakeHead.update();
    
    stop = gameOver(snake[0].x,snake[0].y,snake);
    drawGameOver (stop);

    setTimeout(() => {
    if (!stop){requestAnimationFrame(animate);};
    }, 1000 / fps);
    
    drawGameOver(stop);
    food.draw();
    eating(snakeHead,food);
    drawScore(score);
    
}

//main

init();
animate();