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
import { GameBoard } from "./class.js";
describe("GameBoard Class", () => {
  const gameboard = new GameBoard();

  test("is created", () => {
    expect(gameboard.misses).toEqual([]);
    expect(gameboard.ships).toEqual([]);
    expect(gameboard.shipCoords).toEqual(new Map());
  });

  test("places ships", () => {
    gameboard.placeShip(4, "vertical", [5, 5]);

    expect(gameboard.misses).toEqual([]);
    expect(gameboard.ships).toEqual([
      { length: 4, timesHit: 0, isSunk: false, hitCoords: [] },
    ]);

    // Checking the shipCoords Map
    expect(gameboard.shipCoords.size).toBe(4);

    expect(gameboard.shipCoords.has("5,5")).toBe(true);
    expect(gameboard.shipCoords.has("5,6")).toBe(true);
    expect(gameboard.shipCoords.has("5,7")).toBe(true);
    expect(gameboard.shipCoords.has("5,8")).toBe(true);

    const ship = gameboard.ships[0];
    expect(gameboard.shipCoords.get("5,5")).toBe(ship);
    expect(gameboard.shipCoords.get("5,6")).toBe(ship);
    expect(gameboard.shipCoords.get("5,7")).toBe(ship);
    expect(gameboard.shipCoords.get("5,8")).toBe(ship);
  });
});
describe("GameBoard hit function", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new GameBoard();
    gameboard.placeShip(3, "horizontal", [2, 2]);
  });

  test("registers a hit", () => {
    expect(gameboard.receiveAttack([2, 2])).toBe("hit");

    const ship = gameboard.shipCoords.get("2,2");
    expect(ship.timesHit).toBe(1);
    expect(ship.isSunk).toBe(false);
  });

  test("registers a miss", () => {
    expect(gameboard.receiveAttack([5, 5])).toBe("miss");
    expect(gameboard.misses).toContain("5,5");
  });

  test("sinks a ship after enough hits", () => {
    gameboard.receiveAttack([2, 2]);
    gameboard.receiveAttack([3, 2]);
    gameboard.receiveAttack([4, 2]);

    const ship = gameboard.shipCoords.get("2,2");
    expect(ship.isSunk).toBe(true);
  });
});

// Player Tests
import { Player } from "./class.js";
describe("Player Class", () => {
  const player = new Player();

  test("is created with a gameboard", () => {
    expect(player.gameboard).toBeInstanceOf(GameBoard);
    expect(player.gameboard.misses).toEqual([]);
    expect(player.gameboard.ships).toEqual([]);
    expect(player.gameboard.shipCoords).toBeInstanceOf(Map);
    expect(player.gameboard.shipCoords.size).toBe(0);
  });
});
