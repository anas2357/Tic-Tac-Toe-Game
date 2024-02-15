let boxes = document.querySelectorAll(".inner-btn");
let resetBtn = document.querySelector("#reset");
let playersTurn = document.querySelector("#turn");
let won = document.querySelector("#won");
let winner = document.querySelector("#winner");
let playAgainBtn = document.querySelector("#playAgain");
let drawCon = document.querySelector("#drawCon");
let winnerFound = false;
let moves = 0;
let emptyBox = false;
let empty = [1, 1, 1, 1, 1, 1, 1, 1, 1];

let turnO = false;

let winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let turn = () => {
  if(turnO){
    playersTurn.innerText = "Player O's turn";
  } else{
    playersTurn.innerText = "Player X's turn";
  }
}

let draw = () => {
  drawCon.innerText = "OOPS!";
  won.style.visibility = "visible";
  winner.innerText = "MATCH DRAW";

}

boxes.forEach((box) => {
  box.addEventListener("click",(evt) => {
    // console.log("button was clicked");
    let idx = box.getAttribute("ID");
    idx--;
    empty[idx] = 0;
    if(turnO){
      box.innerText = "O";
      turnO = false;
    }
    else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    box.style.opacity = "0.85";

    checkWinner();
    
    turn();

    moves++;
    if(moves === 9 && !winnerFound) draw();
    // console.log(moves);
    emptyBox = false;    
    box.style.color = "white";
  })
})

let reset = () => {
    boxes.forEach((box) => {
      box.innerText = "";
      box.disabled = false;
      turnO = false;
      moves = 0;
      turn();
      box.style.opacity = "1";
      for(let i in empty){
        empty[i] = 1;
      }
    }
  )  
}

resetBtn.addEventListener("click", (evt) => {
  reset();
})

const checkWinner = () => {
  for(let ele of winPatterns){
    let a = ele[0];
    let b = ele[1];
    let c = ele[2];
    let pos1val = boxes[a].innerText;
    let pos2val = boxes[b].innerText;
    let pos3val = boxes[c].innerText;

    if(pos1val !== "" && pos1val === pos2val && pos2val === pos3val){
      drawCon.innerText = "Congractulations!";
      won.style.visibility = "visible";
      winner.innerText = `Player '${pos1val}' Won`;
      winnerFound = true;
    }
  }
}

playAgainBtn.addEventListener("click", () => {
  reset();
  won.style.visibility = "hidden";
})


boxes.forEach ((box) => {
  box.addEventListener("mouseenter", () => {
    let idx = box.getAttribute("ID");
    idx--;
    // console.log(idx);
    if(empty[idx]){
      box.style.outline = "2px solid rgba(85, 34, 136, 0.873)"
      box.innerText = turnO ? "O" : "X";
      box.style.color = "rgba(85, 34, 136, 1)";
    }
  })
})

boxes.forEach ((box) => {
  box.addEventListener("mouseleave", () => {
    let idx = box.getAttribute("ID");
    idx--;
    box.style.outline= "0px";
    if(empty[idx]){
      box.innerText = "";
    }
  })
})