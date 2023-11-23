import Gameboard from "../modules/Gameboard";
import { expect, test } from "vitest";

test("Ship placed on board", () => {
  const gameboard = new Gameboard();
  const carrier = new Ship([0, 1, 2, 3]);

  gameboard.placeShip(carrier, [0, 3]);

  expect(gameboard.placeShip(carrier, [0, 3])).toBe(true);
});
