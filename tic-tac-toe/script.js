const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const winning_cont = document.getElementById("winning-container");
const winning_text = document.getElementById("winning-text");
const restart_btn = document.getElementById("restart");
let x_turn = true;

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

restart_btn.addEventListener("click", reset);

function setBoardHoverClass() {
  board.classList.remove("x");
  board.classList.remove("circle");
  if (x_turn) {
    board.classList.add("x");
  } else {
    board.classList.add("circle");
  }
}
setBoardHoverClass();

const winning_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  //add mark
  cell.classList.add(x_turn ? "x" : "circle");

  // check for win or draw
  if (checkWin()) {
    winning_cont.classList.add("show");
    winning_text.innerText = `${x_turn ? "X" : "O"} wins!`;
  } else if (checkDraw()) {
    winning_cont.classList.add("show");
    winning_text.innerText = "Draw!";
  }
  //switch turn
  x_turn = !x_turn;
  setBoardHoverClass();
}

function checkWin() {
  return winning_conditions.some((condition) => {
    return condition.every((idx) => {
      return cells[idx].classList.contains(x_turn ? "x" : "circle");
    });
  });
}

function checkDraw() {
  return Array.from(cells).every(
    (cell) => cell.classList.contains("x") || cell.classList.contains("circle")
  );
}
function reset() {
  cells.forEach((cell) => {
    cell.classList.remove("x", "circle");
    cell.removeEventListener("click", handleClick); // Remove old listeners
    cell.addEventListener("click", handleClick, { once: true }); // Add fresh listeners
  });
  x_turn = true;
  setBoardHoverClass();
  winning_cont.classList.remove("show");
}
