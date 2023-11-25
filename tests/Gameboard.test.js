import Gameboard from "../modules/Gameboard";
import Ship from "../modules/Ship";
import { expect, test } from "vitest";

test("Ship placed on board", () => {
  const gameboard = new Gameboard();
  const carrier = new Ship("carrier");

  expect(gameboard.placeShip(carrier, { x: 2, y: 2 }, false)).toBe(true);
  expect(gameboard.shipCount).toBe(1);
});

test("Ship placed vertically", () => {
  const gameboard = new Gameboard();
  const carrier = new Ship("carrier");

  expect(gameboard.placeShip(carrier, { x: 2, y: 1 }, true)).toBe(true);
  expect(gameboard.shipCount).toBe(1);
});

test("Ship does not fit horizontally", () => {
  const gameboard = new Gameboard();
  const carrier = new Ship("carrier");

  expect(gameboard.placeShip(carrier, { x: 2, y: 8 }, false)).toBe(false);
  expect(gameboard.shipCount).toBe(0);
});

test("Ship does not fit vertically", () => {
  const gameboard = new Gameboard();
  const carrier = new Ship("carrier");

  expect(gameboard.placeShip(carrier, { x: 8, y: 2 }, true)).toBe(false);
  expect(gameboard.shipCount).toBe(0);
});

test("Board recieves attack", () => {
  const gameboard = new Gameboard();

  expect(gameboard.recieveAttack({ x: 3, y: 2 })).toBe(true);
});

test("Attack is out of bounds", () => {
  const gameboard = new Gameboard();

  expect(gameboard.recieveAttack({ x: 10, y: 10 })).toBe(false);
});

test("Attack hits ship", () => {
  const gameboard = new Gameboard();
  const submarine = new Ship("submarine");

  gameboard.placeShip(submarine, { x: 1, y: 3 });

  expect(gameboard.recieveAttack({ x: 1, y: 3 })).toBe(true);
});
