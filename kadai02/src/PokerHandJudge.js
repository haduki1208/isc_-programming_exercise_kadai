class PokerHandJudge {
  isRoyal = hand => {
    let royal = [1, 10, 11, 12, 13];
    for (const hadNumber of hand.map(card => card.number)) {
      royal = royal.filter(royalNumber => royalNumber !== hadNumber);
    }
    return !royal.length;
  };

  isStraight = hand => {
    let isStraight = true;
    const numbers = hand.map(card => card.number);
    numbers.reduce((a, c) => {
      if (a + 1 !== c) {
        isStraight = false;
      }
      return c;
    });
    return isStraight;
  };

  isFlash = hand => {
    return new Set(hand.map(card => card.suit)).size === 1;
  };

  isFullHouse = hand => {
    return this.is3Card(hand) && this.is1Pair(hand);
  };

  is4Card = hand => {
    return Array.from(this.getNumberCounter(hand).values()).includes(4);
  };

  is3Card = hand => {
    return Array.from(this.getNumberCounter(hand).values()).includes(3);
  };

  is2Pair = hand => {
    return (
      Array.from(this.getNumberCounter(hand).values()).filter(
        value => value === 2
      ).length === 2
    );
  };

  is1Pair = hand => {
    return Array.from(this.getNumberCounter(hand).values()).includes(2);
  };

  getNumberCounter = hand => {
    const counter = new Map();
    for (const card of hand) {
      counter.set(
        card.number,
        counter.get(card.number) ? counter.get(card.number) + 1 : 1
      );
    }
    return counter;
  };
}

export default new PokerHandJudge();
