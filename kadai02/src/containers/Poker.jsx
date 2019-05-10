import React from 'react';
import { Subscribe } from 'unstated';
import PokerContainer from './PokerContainer';
import PokerTable from '../components/PokerTable';

const Poker = () => (
  <Subscribe to={[PokerContainer]}>
    {poker => (
      <PokerTable hand={poker.state.hand} result={poker.state.handName} />
    )}
  </Subscribe>
);

export default Poker;
