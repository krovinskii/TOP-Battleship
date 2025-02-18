export class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.isSunk = false;
    this.hitCoords = [];
  }
  hit() {
    this.timesHit++;
    if (this.timesHit === this.length) {
      return (this.isSunk = true);
    }
    return this.timesHit;
  }
}
export class GameBoard {
  constructor() {
    this.misses = [];
    this.ships = [];
    this.shipCoords = new Map();
  }
  placeShip(length, direction, coords) {
    const newShip = new Ship(length);
    this.ships.push(newShip);
    const x = coords[0];
    const y = coords[1];

    if (direction.toLowerCase() === "vertical") {
      for (let i = 0; i < length; i++) {
        const coordKey = `${x},${y + i}`;
        this.shipCoords.set(coordKey, newShip);
      }
    } else if (direction.toLowerCase() === "horizontal") {
      for (let i = 0; i < length; i++) {
        const coordKey = `${x + i},${y}`;
        this.shipCoords.set(coordKey, newShip);
      }
    }

    return newShip;
  }
  receiveAttack(coords) {
    const coordKey = `${coords[0]},${coords[1]}`;

    if (this.shipCoords.has(coordKey)) {
      const ship = this.shipCoords.get(coordKey);
      ship.hit();
      return "hit";
    } else {
      this.misses.push(coordKey);
      return "miss";
    }
  }
}

export class Player {
  constructor(type) {
    this.gameboard = new GameBoard();
    this.type = type; //type will be human or computer
  }
}
