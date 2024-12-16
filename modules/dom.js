const rotateButton = document.createElement("button")
const main = document.querySelector("#main")
const gameBoard = document.getElementById("game-board")

export function createDom() {
  rotateButton.classList.add("rotate-button")
  main.append(rotateButton)
}

export function displayBoard(board) {
  for (let i = 0; i < board.length; i++) {
    let row = board[i]
    for (let j = 0; j < row.length; j++) {
      let cellDiv = document.createElement("div")

      row[j].name !== undefined ? cellDiv.append(row[j].name) : cellDiv.append(row[j])

      cellDiv.setAttribute("id", "board-cell")
      cellDiv.setAttribute("data-x", j)
      cellDiv.setAttribute("data-y", i)

      if (cellDiv.textContent !== " ") cellDiv.classList.add("ship-cell")

      gameBoard.appendChild(cellDiv)
    }
  }
};

export function refreshBoard(board) {
  gameBoard.innerHTML = ""
  displayBoard(board)
}
