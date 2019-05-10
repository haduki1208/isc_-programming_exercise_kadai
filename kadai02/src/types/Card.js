import { SUIT } from '../constants/Constants';

class Card {
  constructor(suit, number) {
    this.suit = SUIT[suit];
    this.number = Number.parseInt(number);
  }

  toString() {
    return this.suit + this.number;
  }
}

export default Card;
