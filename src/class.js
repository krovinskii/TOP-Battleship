export class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.isSunk = false;
  }
  hit() {
    this.timesHit++;
    if (this.timesHit === this.length) {
      return (this.isSunk = true);
    }
    return this.timesHit;
  }
}
export class Gameboard {
  constructor() {
    this.grid = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.shipCoords = new Map();
    this.misses = [];
  }
  placeShip(length, startingPoint, direction) {
    const ship = new Ship(length);
    this.ships.push(ship);
    let x = startingPoint[0];
    let y = startingPoint[1];

    for (let i = 0; i < length; i++) {
      this.shipCoords.set(`${x},${y}`, ship);

      if (direction === "horizontal") {
        x++;
      } else if (direction === "vertical") {
        y++;
      }
    }
  }

  receiveAttack(x, y) {}
  allSunk() {}
}
