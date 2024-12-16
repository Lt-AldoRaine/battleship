export default class Player {
  constructor(isAi = false, isTurn = false, firstTurn = true) {
    this.isAi = isAi;
    this.firstTurn = firstTurn;
    this.isTurn = isTurn;
    this.playerShips = []
    this.turnCount = 0
  }

  addShip(ship) {
    this.playerShips.push(ship)
  }
}
