import React from 'react';
import { CARD_FONTS } from '../constants/Constants';
import './PokerTable.css';

const PokerTable = props => (
  <div>
    <ul>
      {props.hand.map((card, i) => {
        return (
          <li
            key={i}
            className={
              card.suit === 'D' || card.suit === 'H'
                ? 'cards cards-red'
                : 'cards'
            }
          >
            {CARD_FONTS[card.suit][card.number]}
          </li>
        );
      })}
    </ul>
    <div>{props.result}</div>
  </div>
);

export default PokerTable;
