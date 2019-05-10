import { Container } from 'unstated';
import deck from '../types/Deck';
// import Card from "../types/Card";
import pokerHandJudge from '../utils/PokerHandJudge';

class PokerContainer extends Container {
  constructor() {
    super();
    this.drawCard();
  }

  state = {
    hand: [],
    handName: ''
  };

  drawCard = () => {
    if (this.state.hand.length >= 5) {
      return false;
    }

    let { hand } = this.state;
    for (let i = hand.length; i < 5; i++) {
      const j = Math.floor(deck.length * Math.random());
      const card = deck.splice(j, 1)[0];
      hand.push(card);
    }
    hand = hand.sort((a, b) => a.number - b.number);
    this.setState(() => ({ hand }));
    this.judgeHand(hand);
  };

  judgeHand = hand => {
    // ifの位置変えような
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
      this.setState(() => ({ handName: 'ファイブカード' }));
    } else if (isRoyal && isFlash) {
      this.setState(() => ({
        handName: 'ロイヤルストレートフラッシュ'
      }));
    } else if (isStraight && isFlash) {
      this.setState(() => ({ handName: 'ストレートフラッシュ' }));
    } else if (is4Card) {
      this.setState(() => ({ handName: 'フォーカード' }));
    } else if (isFullHouse) {
      this.setState(() => ({ handName: 'フルハウス' }));
    } else if (isFlash) {
      this.setState(() => ({ handName: 'フラッシュ' }));
    } else if (isStraight || isRoyal) {
      this.setState(() => ({ handName: 'ストレート' }));
    } else if (is3Card) {
      this.setState(() => ({ handName: 'スリーカード' }));
    } else if (is2Pair) {
      this.setState(() => ({ handName: 'ツーペア' }));
    } else if (is1Pair) {
      this.setState(() => ({ handName: 'ワンペア' }));
    } else {
      this.setState(() => ({ handName: 'ハイカード(ブタ)' }));
    }
  };
}

export default PokerContainer;
