import Card from './Card';

class Deck extends Array {
  constructor() {
    super();
    this.init();
  }

  init() {
    for (let suit = 0; suit < 4; suit++) {
      for (let number = 1; number <= 13; number++) {
        this.push(new Card(suit, number));
      }
    }
    // joker
    this.push(new Card(4, 0));
    this.push(new Card(4, 0));
  }
}

// singleton
export default new Deck();
