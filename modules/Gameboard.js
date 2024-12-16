export default class Gameboard {
  constructor() {
    this.board = new Array(10).fill().map(() => new Array(10).fill(" "));
    this.ships = [];
    this.shipCount = 0;
    this.allShipsSunk = false;
    this.hitAttacks = 0;
  }

  placeShip(ship, coords, isVertical = false) {
    let rowStart = coords.y;
    let colStart = coords.x;
    let shipCoords = [];
    const shipLength = ship.length;

    if (!isVertical) {
      if (this.validCell(rowStart, colStart, shipLength, isVertical)) {
        for (let i = 0; i < shipLength; i++) {
          shipCoords.push({ x: colStart + i, y: rowStart });
        }

        for (let i = 0; i < shipLength; i++) {
          if (this.cellContainsShip({ x:shipCoords[i].x, y:shipCoords[i].y })) return false;
        }

        this.board[rowStart].splice(colStart, shipLength, ...new Array(shipLength).fill(ship))
        this.ships.push(ship);
        this.shipCount += 1;
        return true
      } else {
        return false
      };
    } else {
      if (this.validCell(rowStart, colStart, shipLength, isVertical)) {
        for (let i = 0; i < shipLength; i++) {
          shipCoords.push({ x: colStart, y: rowStart + i })
        }

        for (let i = 0; i < shipLength; i++) {
          if (this.cellContainsShip({ x:shipCoords[i].x, y:shipCoords[i].y })) return false;
        }

        Array.from({ length: shipLength }, (_, i) => this.board[rowStart + i][colStart] = ship)
        this.ships.push(ship);
        this.shipCount += 1;
        return true
      } else {
        return false
      };
    }
  }



  validCell(row, col, len, isVertical = false) {
    if (!isVertical) {
      if (10 - col >= len) {
        return true
      } else return false
    } else {
      if (10 - row >= len) {
        return true
      } else return false
    }
  }

  cellContainsShip(coords) {
    const area = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]]

    for (let [dx, dy] of area) {
      const newX = coords.x + dx;
      const newY = coords.y + dy;

      if (newY >= 0 && newY < this.board.length && newX >= 0 && newX < this.board[0].length) {
        if (this.board[newY][newX] !== " ") {
          return true
        }
      }
    }

    return false
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
