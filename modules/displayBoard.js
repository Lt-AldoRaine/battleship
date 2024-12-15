import Gameboard from "./Gameboard";

export default function displayBoard() {
  let bodr = new Gameboard();

  let gameBoard = document.getElementById("game-board")

  for (let i = 0; i < bodr.board.length; i++) {
    let cell = bodr.board[i]
    for (let j = 0; j < cell.length; j++) {
      let cellDiv = document.createElement("div")

      cellDiv.append(cell[j])
      cellDiv.setAttribute("id", "board-cell")

      gameBoard.appendChild(cellDiv)

      cellDiv.addEventListener("mouseup", () => {
        console.log(bodr.board[i][j])
      })

      if (cellDiv.textContent !== " ") {
        cellDiv.classList.add("ship-cell")
      } 
    }
  }
};


