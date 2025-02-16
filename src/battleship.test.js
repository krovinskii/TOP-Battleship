//Class tests
import { Ship } from "./class.js";
describe("Ship Class", () => {
  test("is created", () => {
    expect(new Ship(4, 0)).toEqual({ length: 4, timesHit: 0, isSunk: false });
  });
  test("is sunk", () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship).toEqual({ length: 4, timesHit: 4, isSunk: true });
  });
  test("is hit", () => {
    const ship = new Ship(4);

    ship.hit();

    expect(ship).toEqual({ length: 4, timesHit: 1, isSunk: false });
  });
});
