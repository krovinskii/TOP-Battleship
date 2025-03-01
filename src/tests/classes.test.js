import { Ship } from "../classes";
import { Gameboard } from "../classes";
import { Player } from "../classes";
// || --------------------------Ship Class-----------------------//
describe("Ship Class", () => {
  const dookieShip = new Ship(4);
  it("is Created", () => {
    expect(dookieShip.length).toEqual(4);
    expect(dookieShip.timesHit).toEqual(0);
    expect(dookieShip.sunk).toBe(false);
  });
  test("isHit()", () => {
    expect(dookieShip.isHit()).toEqual((dookieShip.timesHit = 1));
  });
  test("isSunk()", () => {
    dookieShip.isHit();
    dookieShip.isHit();
    dookieShip.isHit();
    dookieShip.isHit();
    expect(dookieShip.sunk).toBe(true);
  });
});
// || --------------------------Gameboard Class------------------//
describe("Gameboard Class", () => {
  const game = new Gameboard();
  it("is created", () => {
    expect(game.shipLocations.size).toBe(0);
    expect(game.misses).toEqual([]);
    expect(game.allSunk).toBe(false);
  });
  test("placeShip", () => {
    game.placeShip(4, "vertical", [0, 0]);
    expect([...game.shipLocations.entries()]).toEqual([
      ["0,0", expect.objectContaining({ length: 4, timesHit: 0, sunk: false })],
      ["0,1", expect.objectContaining({ length: 4, timesHit: 0, sunk: false })],
      ["0,2", expect.objectContaining({ length: 4, timesHit: 0, sunk: false })],
      ["0,3", expect.objectContaining({ length: 4, timesHit: 0, sunk: false })],
    ]);
  });
  test("receiveAttack", () => {
    game.placeShip(4, "vertical", [0, 0]);
    game.receiveAttack([0, 0]);
    expect([...game.shipLocations.entries()]).toEqual([
      ["0,0", expect.objectContaining({ length: 4, timesHit: 1, sunk: false })],
      ["0,1", expect.objectContaining({ length: 4, timesHit: 1, sunk: false })],
      ["0,2", expect.objectContaining({ length: 4, timesHit: 1, sunk: false })],
      ["0,3", expect.objectContaining({ length: 4, timesHit: 1, sunk: false })],
    ]);
    //Miss
    game.receiveAttack([5, 5]);
    expect(game.misses).toEqual([[5, 5]]);
  });
});
// || --------------------------Player Class------------------//
describe("Player Class", () => {
  const player = new Player("human");
  const player2 = new Player("AI");
  it("is created", () => {
    expect(player.type).toEqual("human");
    expect(player2.type).toEqual("AI");
    expect(player.game).toBeInstanceOf(Gameboard);
    expect(player2.game).toBeInstanceOf(Gameboard);
  });
});
