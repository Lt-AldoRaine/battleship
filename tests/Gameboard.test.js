import Gameboard from "../modules/Gameboard";
import Ship from "../modules/Ship";
import { describe, expect, it } from "vitest";

describe("Gameboard", () => {
  it("Ship placed on board", () => {
    const gameboard = new Gameboard();
    const carrier = new Ship("carrier");

    expect(gameboard.placeShip(carrier, { x: 2, y: 2 }, false)).toBe(true);
    expect(gameboard.shipCount).toBe(1);
  });

  it("Ship placed vertically", () => {
    const gameboard = new Gameboard();
    const carrier = new Ship("carrier");

    expect(gameboard.placeShip(carrier, { x: 2, y: 1 }, true)).toBe(true);
    expect(gameboard.shipCount).toBe(1);
  });

  it("Ship does not fit horizontally", () => {
    const gameboard = new Gameboard();
    const carrier = new Ship("carrier");

    expect(gameboard.placeShip(carrier, { x: 2, y: 8 }, false)).toBe(false);
    expect(gameboard.shipCount).toBe(0);
  });

  it("Ship does not fit vertically", () => {
    const gameboard = new Gameboard();
    const carrier = new Ship("carrier");

    expect(gameboard.placeShip(carrier, { x: 7, y: 2 }, true)).toBe(false);
    expect(gameboard.shipCount).toBe(0);
  });

  it("Ships cannot overlap", () => {
    const gameboard = new Gameboard();
    const carrier = new Ship("carrier");
    const submarine = new Ship("submarine");

    gameboard.placeShip(carrier, { x: 0, y: 1 });

    expect(gameboard.placeShip(submarine, { x: 0, y: 2 })).toBe(false);
    expect(gameboard.shipCount).toBe(1);
  });

  it("Cell contains ship", () => {
    const gameboard = new Gameboard();
    const carrier = new Ship("carrier");

    gameboard.placeShip(carrier, { x: 0, y: 1 });

    expect(gameboard.cellContainsShip({ x: 0, y: 1 })).toBe(true);
  });

  it("Board recieves attack", () => {
    const gameboard = new Gameboard();

    expect(gameboard.recieveAttack({ x: 0, y: 2 })).toBe(true);
  });

  it("Attack is out of bounds", () => {
    const gameboard = new Gameboard();

    expect(gameboard.recieveAttack({ x: 10, y: 10 })).toBe(false);
  });

  it("Attack hits ship", () => {
    const gameboard = new Gameboard();
    const submarine = new Ship("submarine");

    console.log(submarine.hits);

    gameboard.placeShip(submarine, { x: 1, y: 3 });

    expect(gameboard.recieveAttack({ x: 1, y: 3 })).toBe(true);
    expect(submarine.hits).toBe(1);
  });

  it("Attack sinks ship", () => {
    const gameboard = new Gameboard();
    const patrolBoat = new Ship("patrol boat");

    gameboard.placeShip(patrolBoat, { x: 0, y: 1 });
    gameboard.recieveAttack({ x: 0, y: 1 });
    gameboard.recieveAttack({ x: 0, y: 2 });

    patrolBoat.isSunk();

    expect(patrolBoat.sunk).toBe(true);
  });

  it("Detects all ships sunk", () => {
    const gameboard = new Gameboard();
    const patrolBoat = new Ship("patrol boat");

    gameboard.placeShip(patrolBoat, { x: 0, y: 1 });
    gameboard.recieveAttack({ x: 0, y: 1 });
    gameboard.recieveAttack({ x: 0, y: 2 });

    gameboard.checkShipsSunk();

    expect(gameboard.allShipsSunk).toBe(true);
  });
});
