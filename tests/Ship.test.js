import { expect, test } from "vitest";
import Ship from "../modules/Ship";

test("Ship gets hit", () => {
  const ship = new Ship("carrier");
  ship.hit();

  expect(ship.hits).toEqual(1);
});

test("Ship takes multiple hits", () => {
  const ship = new Ship("carrier");
  ship.hit();
  ship.hit();

  expect(ship.hits).toEqual(2);
});

test("Ship gets sunk", () => {
  const ship = new Ship("patrol boat");
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});

test("Ship has correct length", () => {
  const carrier = new Ship("carrier");

  expect(carrier.length).toBe(5);
});
