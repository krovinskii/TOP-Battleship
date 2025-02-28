import { Ship } from "../classes";

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
