import React from 'react';
import Deck from './Deck';
import { CARD_FONTS } from './Constants';
import './App.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deck: new Deck(),
      hand: [],
      result: '',
    }
    this.drawCard = this.drawCard.bind(this);
    this.judgeHand = this.judgeHand.bind(this);
  }

  drawCard() {
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

    this.setState({
      deck,
      hand,
    });
  }

  judgeHand(hand) {
    const isRoyal = this.__isRoyal(hand);
    const isStraight = this.__isStraight(hand);
    const isFlash = this.__isFlash(hand);
    const isFullHouse = this.__isFullHouse(hand);
    const is4Card = this.__is4Card(hand);
    const is3Card = this.__is3Card(hand);
    const is2Pair = this.__is2Pair(hand);
    const is1Pair = this.__is1Pair(hand);

    if (isRoyal && isFlash) {
      this.setState({ result: 'ロイヤルストレートフラッシュ' });
    } else if (isStraight && isFlash) {
      this.setState({ result: 'ストレートフラッシュ' });
    } else if (is4Card) {
      this.setState({ result: 'フォーカード' });
    } else if (isFullHouse) {
      this.setState({ result: 'フルハウス' });
    } else if (isFlash) {
      this.setState({ result: 'フラッシュ' });
    } else if (isStraight || isRoyal) {
      this.setState({ result: 'ストレート' });
    } else if (is3Card) {
      this.setState({ result: 'スリーカード' });
    } else if (is2Pair) {
      this.setState({ result: 'ツーペア' });
    } else if (is1Pair) {
      this.setState({ result: 'ワンペア' });
    } else {
      this.setState({ result: 'ハイカード(ブタ)' });
    }
  }

  __isRoyal(hand) {
    return hand.map(card => card.number).toString() === [1, 10, 11, 12, 13].toString();
  }

  __isStraight(hand) {
    let isStraight = true;
    const numbers = hand.map(card => card.number);
    numbers.reduce((a, c) => {
      if (a + 1 !== c) {
        isStraight = false;
      }
      return c;
    });
    return isStraight;
  }

  __isFlash(hand) {
    return new Set(hand.map(card => card.suit)).size === 1;
  }

  __isFullHouse(hand) {
    return this.__is3Card(hand) && this.__is1Pair(hand);
  }

  __is4Card(hand) {
    return Array.from(this.__getNumberCounter(hand).values()).includes(4);
  }

  __is3Card(hand) {
    return Array.from(this.__getNumberCounter(hand).values()).includes(3);
  }

  __is2Pair(hand) {
    return Array.from(this.__getNumberCounter(hand).values())
      .filter(value => value === 2)
      .length === 2;
  }

  __is1Pair(hand) {
    return Array.from(this.__getNumberCounter(hand).values()).includes(2);
  }

  __getNumberCounter(hand) {
    const counter = new Map();
    for (const card of hand) {
      counter.set(card.number, counter.get(card.number) ? counter.get(card.number) + 1 : 1);
    }
    return counter;
  }

  componentDidMount() {
    this.drawCard();
    this.judgeHand(this.state.hand);
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.hand.map((card, i) => {
            return (
              <li
                key={i}
                className={card.suit === "D" || card.suit === "H" ? "cards cards-red" : "cards"}
              >
                {CARD_FONTS[card.suit][card.number]}
              </li>
            )
          })}
        </ul>
        <div>
          {this.state.result}
        </div>
      </div>
    );
  }
}

export default App;