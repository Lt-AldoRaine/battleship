import { expect, describe, it } from "vitest";
import Ship from "../modules/Ship";

describe("Ship", () => {
  it("Ship gets hit", () => {
    const ship = new Ship("carrier");
    ship.hit();

    expect(ship.hits).toEqual(1);
  });

  it("Ship takes multiple hits", () => {
    const ship = new Ship("carrier");
    ship.hit();
    ship.hit();

    expect(ship.hits).toEqual(2);
  });

  it("Ship gets sunk", () => {
    const ship = new Ship("patrol boat");
    ship.hit();
    ship.hit();

    ship.isSunk();

    expect(ship.sunk).toBe(true);
  });

  it("Ship has correct length", () => {
    const carrier = new Ship("carrier");

    expect(carrier.length).toBe(5);
  });
});
