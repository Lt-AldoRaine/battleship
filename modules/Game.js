import Gameboard from "./Gameboard";
import Ship from "./Ship"
import Player from "./Player";
import { refreshBoard, displayBoard } from "./dom";

export default function game() {

  let player1Board = new Gameboard();
  let player2Board = new Gameboard();
  let player1 = new Player(false, true)
  let player2 = new Player(true)
  let isVertical = false

  const givePlayerShips = (player) => {
    let carrier = new Ship("carrier")
    let battleship = new Ship("battleship")
    let destroyer = new Ship("destroyer")
    let submarine = new Ship("submarine")
    let patrolBoat = new Ship("patrol boat")

    let ships = [carrier, battleship, destroyer, submarine, patrolBoat]

    ships.forEach((ship) => {
      player.addShip(ship)
    })

  }

  const handleRotate = () => {
    const rotateButton = document.querySelector(".rotate-button")

    rotateButton.addEventListener("click", () => {
      isVertical = !isVertical
    })
  }

  const placeNextShip = (player, playerBoard, index = 0) => {
    const boardCells = document.querySelectorAll("#board-cell")

    if (index < player.playerShips.length) {
      let currentShip = player.playerShips[index]
      boardCells.forEach((cell) => {
        let coords = { x: 0, y: 0 };
        cell.addEventListener("click", (e) => {
          coords = { x: parseInt(e.target.dataset.x), y: parseInt(e.target.dataset.y) }
          const shipPlaced = playerBoard.placeShip(currentShip, coords, isVertical);

          if (shipPlaced) {
            placeNextShip(player, playerBoard, index)
            refreshBoard(playerBoard.board)

            index++
          } else {
            index = index
            console.log("no")
          }
          placeNextShip(player, playerBoard, index)
        }, { once: true })
      })
    } else {
      console.log("All ships placed")
      player.turnCount++
    }
  }

  const playerTurn = (player, playerBoard) => {
    displayBoard(playerBoard.board);

    if (player.firstTurn) {
      givePlayerShips(player)
      placeNextShip(player, playerBoard);
    }
  }

  const play = () => {
    if (player1.isTurn) {
      playerTurn(player1, player1Board)
      player1.isTurn = false
      player2.isTurn = true
    } else {
      playerTurn(player2, player2Board)
      player2.isTurn = false
      player1.isTurn = true
    }
  }

  play()
  handleRotate()
} 
