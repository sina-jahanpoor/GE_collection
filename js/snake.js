let firstLine = document.getElementById("line1");
let secondLine = document.getElementById("line2");
document.getElementById("back-to-main").addEventListener("click", () => {
    window.history.back();
  });
document.addEventListener('keydown',function(event){
    if(event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight"){
        event.preventDefault();
    }
})

let gameBoard;
let context;

let rows = (window.screen.width / 100) * 1.5;
let columns = (window.screen.width / 100) * 2;
let individualBoxSize = 25;

let foodX;
let foodY;

let speedX = 0;
let speedY = 0;

let gameOver = false;
let intervalId;

let snakeX = 7 * individualBoxSize;
let snakeY = 7 * individualBoxSize;

let snakeBody = [];

let currentScore = 0;
let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore"))
  : 0;

window.onload = function () {
  gameBoard = document.getElementById("game-board");
  context = gameBoard.getContext("2d");
  gameBoard.height = rows * individualBoxSize;
  gameBoard.width = columns * individualBoxSize;
  placeRandomFood();
  document.addEventListener("keyup", changeDirection);
  intervalId = setInterval(start, 100);
};
function start() {
    updateScore();
    if (gameOver) {
        clearInterval(intervalId);
        return;
    }
    //canvas container => game board
    context.fillStyle = "#000";
    context.fillRect(0, 0, gameBoard.width, gameBoard.height);
    
    //   food
    context.fillStyle = "#ff007f";
    context.fillRect(foodX, foodY, individualBoxSize, individualBoxSize);
    
    //   if snake eats food
  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]); // snake is growing
    placeRandomFood();
    currentScore++;
    if(currentScore>0){
        firstLine.classList.add("green-line");
      secondLine.classList.add("green-line");
      setTimeout(()=>{
        firstLine.classList.remove("green-line");
        secondLine.classList.remove("green-line");
      },1500)
    }
    updateScore();
}

// snake ki body ko move
for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
}

if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY]; // first segment before head
}

//   snake head
context.fillStyle = "#00ffff";
snakeX += speedX * individualBoxSize;
snakeY += speedY * individualBoxSize;
context.fillRect(snakeX, snakeY, individualBoxSize, individualBoxSize);

//   Draw snake ki body
for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(
        snakeBody[i][0],
      snakeBody[i][1],
      individualBoxSize,
      individualBoxSize
    );
  }
  
  // Game Over condition
  // wall hit
  if (
      snakeX < 0 ||
      snakeY < 0 ||
      snakeX > columns * individualBoxSize ||
      snakeY > rows * individualBoxSize
    ) {
        gameOver = true;
        firstLine.classList.add("red-lose");
        secondLine.classList.add("red-lose");
        setTimeout(()=>{
          firstLine.classList.remove("red-lose");
          secondLine.classList.remove("red-lose");
        },1500)
    }
    
    //self hit
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
    }
}
}

function placeRandomFood() {
    foodX = Math.floor(Math.random() * columns) * individualBoxSize;
    foodY = Math.floor(Math.random() * rows) * individualBoxSize;
}

function changeDirection(event) {
    console.log(event.code);
    if (event.code === "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (event.code === "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (event.code === "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (event.code === "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
    
    if (gameOver) {
      restartGame();
    }
}

function restartGame() {
    clearInterval(intervalId); // no needed
    
    snakeX = 7 * individualBoxSize;
    snakeY = 7 * individualBoxSize;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    currentScore = 0;
    gameOver = false;
    context.clearRect(0, 0, gameBoard.width, gameBoard.height);
    intervalId = setInterval(start, 100);
}

function updateScore() {
    document.getElementById("current-score").innerHTML = `Score: ${currentScore}`;
    
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem("highScore", highScore); // new high score saved
    }
    
    document.getElementById("high-score").innerHTML = `High Score: ${highScore}`;
}
