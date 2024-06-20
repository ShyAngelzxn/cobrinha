const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");

const box = 20;
const canvasSize = canvas.width / box;

let snake, food, score, direction, nextDirection, game;

restartButton.addEventListener("click", restartGame);
document.addEventListener("keydown", changeDirection);

function initializeGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box,
  };
  score = 0;
  direction = null;
  nextDirection = null;
}

function restartGame() {
  clearInterval(game);
  initializeGame();
  game = setInterval(draw, 100);
}

function changeDirection(event) {
  const key = event.key.toUpperCase();
  if (key === "A" && direction !== "RIGHT") {
    nextDirection = "LEFT";
  } else if (key === "W" && direction !== "DOWN") {
    nextDirection = "UP";
  } else if (key === "D" && direction !== "LEFT") {
    nextDirection = "RIGHT";
  } else if (key === "S" && direction !== "UP") {
    nextDirection = "DOWN";
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (nextDirection) {
    direction = nextDirection;
  }

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * canvasSize) * box,
      y: Math.floor(Math.random() * canvasSize) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);

  ctx.fillStyle = "black";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

initializeGame();
game = setInterval(draw, 100);
