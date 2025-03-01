//All classes used in the game. Tests can be found in tests/classes.test.js

export class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.sunk = false;
  }
  isHit() {
    if (this.isSunk() === true) {
      return;
    } else {
      return (this.timesHit += 1);
    }
  }
  isSunk() {
    if (this.timesHit === this.length) {
      this.sunk = true;
      return true;
    } else {
      return false;
    }
  }
}
export class Gameboard {
  constructor() {
    this.shipLocations = new Map();
    this.misses = [];
    this.allSunk = false;
  }

  placeShip(length, direction, coordXY) {
    const ship = new Ship(length);
    const x = coordXY[0];
    const y = coordXY[1];

    if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        const key = `${x},${y + i}`;
        this.shipLocations.set(key, ship);
      }
    }

    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        const key = `${x + i},${y}`;
        this.shipLocations.set(key, ship);
      }
    }
  }
}
