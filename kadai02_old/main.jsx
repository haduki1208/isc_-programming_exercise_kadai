const MARK = {
  0: "S",
  1: "C",
  2: "D",
  3: "H",
}

class Card {
  constructor(mark, number) {
    this.mark = MARK[mark];
    this.number = Number.parseInt(number);
  }
}

class Deck extends Array {
  constructor() {
    super();
    this.init();
  }

  init() {
    for (let mark = 0; mark < 4; mark++) {
      for (let number = 1; number <= 13; number++) {
        this.push(new Card(mark, number));
      }
    }
  }
}

class App extends React.Component {
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
    return new Set(hand.map(card => card.mark)).size === 1;
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
    // [2, 2, 1]の組み合わせがツーペア
    return this.__is1Pair(hand) && Array.from(this.__getNumberCounter(hand).values()).length === 3;
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
      <div style={AppStyles.appContainer}>
        <ul style={AppStyles.handContainer}>
          {this.state.hand.map((card, i) => {
            return (
              <li key={i}>{card.mark}{card.number}</li>
            )
          })}
        </ul>
        <div style={AppStyles.textBox}>
          {this.state.result}
        </div>
      </div>
    );
  }
}

const AppStyles = {
  appContainer: {
    width: 360,
  },
  handContainer: {
    display: 'flex',
    listStyle: 'none',
    justifyContent: 'space-between',
  },
  textBox: {
    textAlign: 'center',
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
