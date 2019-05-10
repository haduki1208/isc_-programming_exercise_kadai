class PokerHandJudge {
  is5Card = hand => {
    const nonJokerHand = this._removedJokerHand(hand);
    switch (this._hadJokerCount(hand)) {
      case 1:
        // 4card + 1jokerか調べる
        return this.is4Card(nonJokerHand);
      case 2:
        // 3card + 2jokerか調べる
        return this.is3Card(nonJokerHand);
      default:
        return false;
    }
  };

  isRoyal = hand => {
    const royal = [1, 10, 11, 12, 13, 0, 0];
    // 手札に持っているカードをroyalから消去していき要素が2個残れば
    // ロイヤルストレートに必要な条件が揃っている
    for (const hadNumber of hand.map(card => card.number)) {
      const i = royal.findIndex(royalNumber => royalNumber === hadNumber);
      if (i !== -1) {
        royal.splice(i, 1);
      }
    }
    return royal.length === 2;
  };

  isStraight = hand => {
    let isStraight = true;
    let jokerCount = this._hadJokerCount(hand);
    const numbers = this._removedJokerHand(hand).map(card => card.number);
    numbers.reduce((a, c) => {
      if (a + 1 === c) {
        return c;
      }
      // jokerの枚数分、1を足して間の数字をjokerで補えるか確認
      while (jokerCount) {
        a++;
        jokerCount--;
        if (a + 1 === c) {
          return c;
        }
      }

      isStraight = false;
      return c;
    });
    return isStraight;
  };

  isFlash = hand => {
    if (this._hadJokerCount(hand)) {
      // jokerのマークを含めて2種類だったらフラッシュ
      return new Set(hand.map(card => card.suit)).size === 2;
    }
    return new Set(hand.map(card => card.suit)).size === 1;
  };

  isFullHouse = hand => {
    if (this._hadJokerCount(hand)) {
      // 成立するパターンは 2pair + joker1枚 のみ
      // 3card + joker1枚 => 4card
      // 1pair + joker2枚 => 4card
      return this.is2Pair(this._removedJokerHand(hand));
    }
    return this.is3Card(hand) && this.is1Pair(hand);
  };

  is4Card = hand => {
    const jokerCount = this._hadJokerCount(hand);
    const nonJokerHand = this._removedJokerHand(hand);
    return Array.from(this._getNumbersCounter(nonJokerHand).values()).includes(
      4 - jokerCount
    );
  };

  is3Card = hand => {
    const jokerCount = this._hadJokerCount(hand);
    const nonJokerHand = this._removedJokerHand(hand);
    return Array.from(this._getNumbersCounter(nonJokerHand).values()).includes(
      3 - jokerCount
    );
  };

  is2Pair = hand => {
    // jokerは考慮しなくてよい
    return (
      Array.from(this._getNumbersCounter(hand).values()).filter(
        value => value === 2
      ).length === 2
    );
  };

  is1Pair = hand => {
    if (this._hadJokerCount(hand)) {
      return Array.from(this._getNumbersCounter(hand).values()).includes(1);
    }
    return Array.from(this._getNumbersCounter(hand).values()).includes(2);
  };

  _getNumbersCounter = hand => {
    const counter = new Map();
    for (const card of hand) {
      counter.set(
        card.number,
        counter.get(card.number) ? counter.get(card.number) + 1 : 1
      );
    }
    return counter;
  };

  _hadJokerCount = hand => {
    return hand.map(card => card.number).filter(number => number === 0).length;
  };

  _removedJokerHand = hand => {
    return hand.filter(card => card.number !== 0);
  };
}

export default new PokerHandJudge();
