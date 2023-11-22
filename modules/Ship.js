export default class Ship {
  constructor(shipCoords) {
    this.shipCoords = shipCoords;
    this.length = shipCoords.length;
    this.hits = [];
    this.sunk = false;
  }

  hit(coord) {
    for (let i = 0; i < this.shipCoords.length; i++) {
      if (coord === this.shipCoords[i]) {
        this.hits.push(coord);
      }
    }
  }

  isSunk() {
    return this.hits.length === this.length
      ? (this.sunk = true)
      : (this.sunk = false);
  }
}
