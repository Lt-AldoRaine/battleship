export default class Gameboard {
  constructor() {
    this.board = new Array(10).fill().map(() => new Array(10).fill(0));
    this.ships = [];
  }

  placeShip(ship, coords) {
    this.ships.push(ship);
  }
}
