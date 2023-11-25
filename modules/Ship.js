export default class Ship {
  constructor(shipName) {
    this.length = this.assignLength(shipName);
    this.name = shipName;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits += 1;
    this.length -= 1;
  }

  isSunk() {
    return this.length <= 0 ? (this.sunk = true) : (this.sunk = false);
  }

  assignLength(name) {
    switch (name) {
      case "carrier":
        return 5;
      case "battleship":
        return 4;
      case "destroyer":
        return 3;
      case "submarine":
        return 3;
      case "patrol boat":
        return 2;
    }
  }
}
