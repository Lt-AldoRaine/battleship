export default class Ship {
  constructor(shipName) {
    this.length = this.assignLength(shipName);
    this.name = shipName;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    if (!this.sunk) {
      this.hits += 1;
    }
    this.isSunk();
  }

  isSunk() {
    return this.hits === this.length ? (this.sunk = true) : (this.sunk = false);
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
