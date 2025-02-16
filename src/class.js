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
