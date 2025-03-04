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
  placeShip(length, direction) {
    const maxAttempts = 100; // Prevent infinite loops
    let attempts = 0;

    while (attempts < maxAttempts) {
      // Generate random coordinates
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const coordXY = [x, y];

      const proposedCoords = [];

      if (direction === "vertical") {
        if (y + length > 10) {
          attempts++;
          continue;
        }

        let isValidPlacement = true;
        for (let i = 0; i < length; i++) {
          const key = `${x},${y + i}`;
          if (this.shipLocations.has(key)) {
            isValidPlacement = false;
            break;
          }
          proposedCoords.push(key);
        }

        if (!isValidPlacement) {
          attempts++;
          continue;
        }
      }

      if (direction === "horizontal") {
        if (x + length > 10) {
          attempts++;
          continue;
        }

        let isValidPlacement = true;
        for (let i = 0; i < length; i++) {
          const key = `${x + i},${y}`;
          if (this.shipLocations.has(key)) {
            isValidPlacement = false;
            break;
          }
          proposedCoords.push(key);
        }

        if (!isValidPlacement) {
          attempts++;
          continue;
        }
      }

      const ship = new Ship(length);

      proposedCoords.forEach((key) => this.shipLocations.set(key, ship));
      return true;
    }

    return false;
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
