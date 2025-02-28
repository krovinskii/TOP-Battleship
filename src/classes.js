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
