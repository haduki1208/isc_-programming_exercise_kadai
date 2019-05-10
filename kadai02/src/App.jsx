import React from 'react';
import { Provider } from 'unstated';
import Poker from './containers/Poker';

const App = () => (
  <Provider>
    <Poker />
  </Provider>
);

export default App;
