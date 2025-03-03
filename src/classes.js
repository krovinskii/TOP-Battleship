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
    //BUG!
    //the subsequential coords after first placement need to be checked if they are more than 9. If so, ship needs to be done again because this pushes us out of bounds
    const ship = new Ship(length);
    const x = coordXY[0];
    const y = coordXY[1];

    const proposedCoords = [];

    if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        const key = `${x},${y + i}`;
        if (this.shipLocations.has(key)) return false; // Prevent overlapping
        proposedCoords.push(key);
      }
    }

    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        const key = `${x + i},${y}`;
        if (this.shipLocations.has(key)) return false; // Prevent overlapping
        proposedCoords.push(key);
      }
    }

    // If no overlaps, place the ship
    proposedCoords.forEach((key) => this.shipLocations.set(key, ship));

    return true;
  }

  receiveAttack(attackCoord) {
    const key = `${attackCoord[0]},${attackCoord[1]}`;

    if (this.misses.some((miss) => miss.toString() === key)) {
      return false;
    }

    if (this.shipLocations.has(key)) {
      const ship = this.shipLocations.get(key);
      ship.isHit();

      if (ship.isSunk()) {
        for (let [location, s] of this.shipLocations.entries()) {
          if (s === ship) {
            this.shipLocations.set(location, ship);
          }
        }
      }
      return true;
    } else {
      this.misses.push(attackCoord);
      return false;
    }
  }
}
export class Player {
  constructor(type) {
    this.type = type; //type === player / ai
    this.game = new Gameboard();
  }
}
