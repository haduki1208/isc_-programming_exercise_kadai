import React from 'react';
import '../css/Cell.css';

interface ICell {
  color: string;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
}

const Cell = (props: ICell): JSX.Element => (
  <td
    style={{ backgroundColor: props.color }}
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}
    onClick={props.onClick}
  />
);

export default Cell;
