// Ship tests
import { Ship } from "./class.js";

describe("Ship Class", () => {
  test("is created", () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
    expect(ship.timesHit).toBe(0);
    expect(ship.isSunk).toBe(false);
  });

  test("is hit", () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.timesHit).toBe(1);
    expect(ship.isSunk).toBe(false);
  });

  test("is sunk", () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk).toBe(true);
  });
});

// Gameboard tests
import { Gameboard } from "./class.js";

describe("Gameboard Class", () => {
  test("should be created with correct default values", () => {
    const board = new Gameboard();

    expect(board.grid.length).toBe(10);
    board.grid.forEach((row) => expect(row.length).toBe(10));

    expect(board.shipCoords).toEqual(new Map());
    expect(board.misses).toEqual([]);
  });

  test("placeShip works", () => {
    const board = new Gameboard();
    board.placeShip(4, [3, 2], "vertical");

    const shipKeys = Array.from(board.shipCoords.keys()); // Extract keys as an array

    expect(shipKeys).toEqual(
      expect.arrayContaining(["3,3", "3,4", "3,4", "3,5"])
    );
  });

  test("receiveAttack hits ship", () => {
    const board = new Gameboard();
    board.placeShip(4, [3, 2], "vertical");

    board.receiveAttack(3, 3);

    expect(board.ships[0].timesHit).toBe(1);
  });
});
