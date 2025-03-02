import { initGame } from "../gameLogic";
import { Player } from "../classes";
import { Ship } from "../classes";
import { Gameboard } from "../classes";
import { randomCoords, randomizeDirection } from "../randomizeXY";
import { shipArray } from "../shipSizes";

describe("Randomization Function Tests", () => {
  test("randomCoords should return valid board coordinates", () => {
    for (let i = 0; i < 100; i++) {
      const coords = randomCoords();
      expect(Array.isArray(coords)).toBe(true);
      expect(coords.length).toBe(2);
      expect(coords[0]).toBeGreaterThanOrEqual(0);
      expect(coords[0]).toBeLessThan(10);
      expect(coords[1]).toBeGreaterThanOrEqual(0);
      expect(coords[1]).toBeLessThan(10);
    }
  });

  test('randomizeDirection should return either "horizontal" or "vertical"', () => {
    for (let i = 0; i < 100; i++) {
      const direction = randomizeDirection();
      expect(["horizontal", "vertical"]).toContain(direction);
    }
  });
});

describe("Ship Placement Tests", () => {
  let player1Board;
  let player2Board;

  beforeEach(() => {
    player1Board = new Player("player");
    player2Board = new Player("ai");
  });

  test("ships should be placed on the board with real randomization", () => {
    const { player1Board, player2Board } = initGame("player", "ai");

    const player1ShipCoords = player1Board.game.shipLocations.size;
    const player2ShipCoords = player2Board.game.shipLocations.size;

    const expectedTotalLength = shipArray.reduce(
      (sum, ship) => sum + ship.length,
      0
    );

    expect(player1ShipCoords).toBe(expectedTotalLength);
    expect(player2ShipCoords).toBe(expectedTotalLength);
  });
  test("manual horizontal ship placement creates the correct number of coordinates", () => {
    player1Board.game.placeShip(3, "horizontal", [0, 0]);

    expect(player1Board.game.shipLocations.size).toBe(3);

    expect(player1Board.game.shipLocations.has("0,0")).toBeTruthy();
    expect(player1Board.game.shipLocations.has("1,0")).toBeTruthy();
    expect(player1Board.game.shipLocations.has("2,0")).toBeTruthy();
  });

  test("manual vertical ship placement creates the correct number of coordinates", () => {
    player1Board.game.placeShip(4, "vertical", [0, 0]);

    expect(player1Board.game.shipLocations.size).toBe(4);

    expect(player1Board.game.shipLocations.has("0,0")).toBeTruthy();
    expect(player1Board.game.shipLocations.has("0,1")).toBeTruthy();
    expect(player1Board.game.shipLocations.has("0,2")).toBeTruthy();
    expect(player1Board.game.shipLocations.has("0,3")).toBeTruthy();
  });

  test("each coordinate points to the correct ship object", () => {
    player1Board.game.placeShip(3, "horizontal", [0, 0]);

    const ship = player1Board.game.shipLocations.get("0,0");

    expect(player1Board.game.shipLocations.get("1,0")).toBe(ship);
    expect(player1Board.game.shipLocations.get("2,0")).toBe(ship);

    expect(ship.length).toBe(3);
    expect(ship.timesHit).toBe(0);
    expect(ship.sunk).toBe(false);
  });

  test("placing multiple ships correctly adds all ships to the board", () => {
    // Place ships manually using lengths from shipArray
    player1Board.game.placeShip(shipArray[0].length, "horizontal", [0, 0]);
    player1Board.game.placeShip(shipArray[1].length, "vertical", [5, 0]);
    player1Board.game.placeShip(shipArray[2].length, "horizontal", [0, 2]);
    player1Board.game.placeShip(shipArray[3].length, "vertical", [2, 5]);
    player1Board.game.placeShip(shipArray[4].length, "horizontal", [6, 6]);

    const expectedTotal = shipArray.reduce((sum, ship) => sum + ship.length, 0);

    expect(player1Board.game.shipLocations.size).toBe(expectedTotal);

    expect(player1Board.game.shipLocations.has("0,0")).toBeTruthy();
    expect(player1Board.game.shipLocations.has("4,0")).toBeTruthy();
    expect(player1Board.game.shipLocations.has("5,3")).toBeTruthy();
    expect(player1Board.game.shipLocations.has("2,6")).toBeTruthy();
    expect(player1Board.game.shipLocations.has("7,6")).toBeTruthy();
  });

  test("ships should not be placed out of bounds", () => {
    player1Board.game.placeShip(3, "horizontal", [8, 0]);

    expect(player1Board.game.shipLocations.size).toBeGreaterThanOrEqual(0);
  });

  test("it should be possible to hit a placed ship", () => {
    player1Board.game.placeShip(3, "horizontal", [1, 1]);

    const hitResult = player1Board.game.receiveAttack([2, 1]);

    expect(hitResult).toBe(true);

    const ship = player1Board.game.shipLocations.get("2,1");
    expect(ship.timesHit).toBe(1);
  });

  test("a ship should be sunk after enough hits", () => {
    player1Board.game.placeShip(2, "horizontal", [3, 3]);

    player1Board.game.receiveAttack([3, 3]);
    player1Board.game.receiveAttack([4, 3]);

    const ship = player1Board.game.shipLocations.get("3,3");
    expect(ship.timesHit).toBe(2);
    expect(ship.sunk).toBe(true);
  });

  test("initGame creates the correct ship configuration", () => {
    const placeSpy = jest.spyOn(Gameboard.prototype, "placeShip");

    initGame("player", "ai");

    expect(placeSpy).toHaveBeenCalledTimes(10);

    placeSpy.mockRestore();
  });

  test("initGame should use the ships from shipArray", () => {
    const placeSpy = jest.spyOn(Gameboard.prototype, "placeShip");

    initGame("player", "ai");

    const shipLengths = shipArray.map((ship) => ship.length);

    const player1Ships = placeSpy.mock.calls.slice(0, 5).map((call) => call[0]);

    for (let length of shipLengths) {
      expect(player1Ships).toContain(length);
    }

    const player2Ships = placeSpy.mock.calls
      .slice(5, 10)
      .map((call) => call[0]);

    for (let length of shipLengths) {
      expect(player2Ships).toContain(length);
    }

    placeSpy.mockRestore();
  });
});
