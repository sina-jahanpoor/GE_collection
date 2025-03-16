const copyButton = document.getElementById("copy-button");
const backButton = document.getElementById("back-button");
const copyMessage = document.getElementById("copy-message");
const dinoButtonImg = document.getElementById("dino-button-img");
const puzzleButtonImg = document.getElementById("puzzle-button-img");
const snakeButtonImg = document.getElementById("snake-button-img");
const dinoButtonText = document.getElementById("dino-button-text");
const puzzleButtonText = document.getElementById("puzzle-button-text");
const snakeButtonText = document.getElementById("snake-button-text");
const main = document.getElementById("main");
const dinoRun = document.getElementById("dino-run");
const puzzle = document.getElementById("puzzle");
const spaceSnake = document.getElementById("space-snake");
const textToCopy = "https://GEcollection.com"; //just for js test
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(textToCopy).then(() => {
    copyMessage.style.visibility = "visible";
    setTimeout(() => {
      copyMessage.style.visibility = "hidden";
    }, 2000);
  });
});
dinoButtonImg.addEventListener("click", openDinoGame);
puzzleButtonImg.addEventListener("click", openPuzzleGame);
snakeButtonImg.addEventListener("click", openSnakeGame);
dinoButtonText.addEventListener("click", openDinoGame);
puzzleButtonText.addEventListener("click", openPuzzleGame);
snakeButtonText.addEventListener("click", openSnakeGame);
backButton.addEventListener("click", () => {
    dinoRun.style.display = "none";
    puzzle.style.display = "none";
    spaceSnake.style.display = "none";
    main.style.display = "flex";
});
function openDinoGame() {
  main.style.display = "none";
  dinoRun.style.display = "block";
}
function openPuzzleGame() {
  main.style.display = "none";
  puzzle.style.display = "block";
}
function openSnakeGame() {
  main.style.display = "none";
  spaceSnake.style.display = "block";
}
