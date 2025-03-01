import { Ship } from "../classes";
import { Gameboard } from "../classes";
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
});
