import Ship from "./Ship";

export default class Gameboard {
  constructor() {
    this.board = new Array(10).fill().map(() => new Array(10).fill(" "));
    this.shipCount = 0;
    this.allShipsSunk = false;
  }

  placeShip(ship, coords, isVertical = false) {
    let rowStart = coords.x;
    let colStart = coords.y;
    const shipLength = ship.length;
    const shipLetter = ship.name.charAt(0).toUpperCase();

    if (!isVertical) {
      if (10 - colStart >= shipLength) {
        for (let i = 0; i < shipLength; i++) {
          this.board[rowStart].splice(colStart++, 1, shipLetter);
        }
        this.shipCount += 1;
        return true;
      } else return false;
    } else {
      if (10 - rowStart >= shipLength) {
        for (let i = 0; i < shipLength; i++) {
          this.board[rowStart++].splice(colStart, 1, shipLetter);
        }
        this.shipCount += 1;
        return true;
      } else return false;
    }
  }
}

let b = new Gameboard();
let carrier = new Ship("carrier");

b.placeShip(carrier, { x: 0, y: 0 }, true);

console.log(b.board);
