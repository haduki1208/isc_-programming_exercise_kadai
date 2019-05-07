import React from "react";
import Deck from "./Deck";
// import Card from './Card';
import { CARD_FONTS } from "./Constants";
import pokerHandJudge from "./PokerHandJudge";
import "./App.css";

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deck: new Deck(),
      hand: [],
      result: ""
    };
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

    this.setState({
      deck,
      hand
    });
  };

  judgeHand = hand => {
    const isRoyal = pokerHandJudge.isRoyal(hand);
    const isStraight = pokerHandJudge.isStraight(hand);
    const isFlash = pokerHandJudge.isFlash(hand);
    const isFullHouse = pokerHandJudge.isFullHouse(hand);
    const is4Card = pokerHandJudge.is4Card(hand);
    const is3Card = pokerHandJudge.is3Card(hand);
    const is2Pair = pokerHandJudge.is2Pair(hand);
    const is1Pair = pokerHandJudge.is1Pair(hand);

    if (isRoyal && isFlash) {
      this.setState({ result: "ロイヤルストレートフラッシュ" });
    } else if (isStraight && isFlash) {
      this.setState({ result: "ストレートフラッシュ" });
    } else if (is4Card) {
      this.setState({ result: "フォーカード" });
    } else if (isFullHouse) {
      this.setState({ result: "フルハウス" });
    } else if (isFlash) {
      this.setState({ result: "フラッシュ" });
    } else if (isStraight || isRoyal) {
      this.setState({ result: "ストレート" });
    } else if (is3Card) {
      this.setState({ result: "スリーカード" });
    } else if (is2Pair) {
      this.setState({ result: "ツーペア" });
    } else if (is1Pair) {
      this.setState({ result: "ワンペア" });
    } else {
      this.setState({ result: "ハイカード(ブタ)" });
    }
  };

  componentDidMount = () => {
    this.drawCard();
    this.judgeHand(this.state.hand);
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.hand.map((card, i) => {
            return (
              <li
                key={i}
                className={
                  card.suit === "D" || card.suit === "H"
                    ? "cards cards-red"
                    : "cards"
                }
              >
                {CARD_FONTS[card.suit][card.number]}
              </li>
            );
          })}
        </ul>
        <div>{this.state.result}</div>
      </div>
    );
  }
}

export default App;
