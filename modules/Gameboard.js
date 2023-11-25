import Ship from "./Ship";

export default class Gameboard {
  constructor() {
    this.board = new Array(10).fill().map(() => new Array(10).fill(" "));
    this.ships = [];
    this.shipCount = 0;
    this.allShipsSunk = false;
    this.hitAttacks = 0;
  }

  placeShip(ship, coords, isVertical = false) {
    let rowStart = coords.x;
    let colStart = coords.y;
    let shipCoords = [];
    const shipLength = ship.length;

    if (!isVertical) {
      if (10 - colStart >= shipLength) {
        for (let i = 0; i < shipLength; i++) {
          // prettier-ignore
          if (this.cellContainsShip({ x: rowStart, y: colStart })) return false;
          shipCoords.push(colStart);
          this.board[rowStart].splice(colStart++, 1, ship);
        }
        this.ships.push(ship);
        this.shipCount += 1;
        return true;
      } else return false;
    } else {
      if (10 - rowStart >= shipLength) {
        for (let i = 0; i < shipLength; i++) {
          // prettier-ignore
          if (this.cellContainsShip({ x: rowStart, y: colStart })) return false;
          this.board[rowStart++].splice(colStart, 1, ship);
        }
        this.ships.push(ship);
        this.shipCount += 1;
        return true;
      } else return false;
    }
  }

  cellContainsShip(coords) {
    if (this.board[coords.x][coords.y] !== " ") {
      return true;
    } else return false;
  }

  recieveAttack(coords) {
    const validX = coords.x < 10 && coords.x >= 0;
    const validY = coords.y < 10 && coords.y >= 0;

    if (validX && validY) {
      if (this.cellContainsShip(coords)) {
        const hitShip = this.board[coords.x][coords.y];
        hitShip.hit();
        return true;
      } else if (!this.cellContainsShip(coords)) {
        this.missedAttacks += 1;
        return true;
      }
    } else return false;
  }

  checkShipsSunk() {
    this.ships.forEach((ship) => {
      if (ship.sunk) {
        this.shipCount -= 1;
      }
    });

    if (this.shipCount === 0) {
      this.allShipsSunk = true;
    }
  }
}

let bodr = new Gameboard();
const submarine = new Ship("submarine");

bodr.placeShip(submarine, { x: 0, y: 2 });

bodr.recieveAttack({ x: 0, y: 2 });
bodr.recieveAttack({ x: 0, y: 3 });
bodr.recieveAttack({ x: 0, y: 4 });

console.log(bodr.board);
