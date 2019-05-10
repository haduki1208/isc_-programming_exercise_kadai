import React from 'react';
import Deck from '../types/Deck';
// import Card from "../types/Card";
import pokerHandJudge from '../utils/PokerHandJudge';
import PokerTable from '../components/PokerTable';

class Poker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deck: new Deck(),
      hand: [],
      result: ''
    };

    this.state.hand = this.drawCard();
    this.state.result = this.judgeHand(this.state.hand);
  }

  drawCard = () => {
    if (this.state.hand.length >= 5) {
      return false;
    }

    let { deck, hand } = this.state;
    for (let i = hand.length; i < 5; i++) {
      const j = Math.floor(deck.length * Math.random());
      const card = deck.splice(j, 1)[0];
      hand.push(card);
    }
    hand = hand.sort((a, b) => a.number - b.number);
    return hand;
  };

  judgeHand = hand => {
    const is5Card = pokerHandJudge.is5Card(hand);
    const isRoyal = pokerHandJudge.isRoyal(hand);
    const isStraight = pokerHandJudge.isStraight(hand);
    const isFlash = pokerHandJudge.isFlash(hand);
    const isFullHouse = pokerHandJudge.isFullHouse(hand);
    const is4Card = pokerHandJudge.is4Card(hand);
    const is3Card = pokerHandJudge.is3Card(hand);
    const is2Pair = pokerHandJudge.is2Pair(hand);
    const is1Pair = pokerHandJudge.is1Pair(hand);

    if (is5Card) {
      return 'ファイブカード';
    } else if (isRoyal && isFlash) {
      return 'ロイヤルストレートフラッシュ';
    } else if (isStraight && isFlash) {
      return 'ストレートフラッシュ';
    } else if (is4Card) {
      return 'フォーカード';
    } else if (isFullHouse) {
      return 'フルハウス';
    } else if (isFlash) {
      return 'フラッシュ';
    } else if (isStraight || isRoyal) {
      return 'ストレート';
    } else if (is3Card) {
      return 'スリーカード';
    } else if (is2Pair) {
      return 'ツーペア';
    } else if (is1Pair) {
      return 'ワンペア';
    } else {
      return 'ハイカード(ブタ)';
    }
  };

  render() {
    return <PokerTable hand={this.state.hand} result={this.state.result} />;
  }
}

export default Poker;
