let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");

let turnO = true; // PlayerO starts
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msg.innerText = "Winner"; // Clear the winner message
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    if (pos1Val && pos2Val && pos3Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return; // Exit after finding a winner
    }
  }

  // Check for draw
  let allFilled = Array.from(boxes).every(box => box.innerHTML);
  if (allFilled) {
    msg.innerText = "It's a Draw!";
  }
};

const handleBoxClick = (box) => {
  if (box.innerHTML === "") {
    box.innerHTML = turnO ? "O" : "X";
    box.disabled = true;
    turnO = !turnO; // Switch turn
    checkWinner();
  }
};

boxes.forEach(box => box.addEventListener("click", () => handleBoxClick(box)));

resetBtn.addEventListener("click", resetGame);