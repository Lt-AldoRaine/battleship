import { expect, test } from "vitest";
import Ship from "../modules/Ship";

test("Ship gets hit", () => {
  const ship = new Ship([0, 1, 2, 3]);
  ship.hit(0);

  expect(ship.hits).toEqual([0]);
});

test("Ship takes multiple hits", () => {
  const ship = new Ship([10, 11, 12, 13]);
  ship.hit(11);
  ship.hit(13);

  expect(ship.hits).toEqual([11, 13]);
});

test("Ship gets sunk", () => {
  const ship = new Ship([0, 1]);
  ship.hit(0);
  ship.hit(1);

  expect(ship.isSunk()).toBe(true);
});
