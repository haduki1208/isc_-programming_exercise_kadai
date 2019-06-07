import React, { PureComponent } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import Cell from './Cell';
import '../css/Borad.css';

type TCell = {
  color: string;
  canPut: boolean;
};

interface IProps {}
interface IState {
  cells: TCell[][];
}

const createCells = (): TCell[][] => {
  const rows: TCell[][] = [];
  for (let i: number = 0; i < 8; i++) {
    const cols: TCell[] = [];
    for (let j: number = 0; j < 8; j++) {
      cols.push({
        color: '#90623c',
        canPut: true
      });
    }
    rows.push(cols);
  }
  return rows;
};

class Board extends PureComponent<IProps, IState> {
  state = {
    cells: createCells()
  };

  private onMouseOverTd = (row: number, col: number): void => {
    if (!this.state.cells[row][col].canPut) {
      return;
    }
    const cells = cloneDeep(this.state.cells);
    cells[row][col].color = '#65d0e6';
    this.setState({ cells });
  };

  private onMouseOutTd = (row: number, col: number): void => {
    if (!this.state.cells[row][col].canPut) {
      return;
    }
    const cells = cloneDeep(this.state.cells);
    cells[row][col].color = '#90623c';
    this.setState({ cells });
  };

  private onClickTd = (row: number, col: number): void => {
    if (!this.state.cells[row][col].canPut) {
      return;
    }
    const cells = cloneDeep(this.state.cells);
    cells[row][col].color = '#FF0000';
    cells[row][col].canPut = false;
    this.setState({ cells });
  };

  private renderCols = (rows: TCell[], rowIndex: number): JSX.Element[] =>
    rows.map((cell, colIndex) => (
      <Cell
        key={colIndex}
        color={cell.color}
        onMouseOver={this.onMouseOverTd.bind(this, rowIndex, colIndex)}
        onMouseOut={this.onMouseOutTd.bind(this, rowIndex, colIndex)}
        onClick={this.onClickTd.bind(this, rowIndex, colIndex)}
      />
    ));

  private renderRows = (): JSX.Element[] =>
    this.state.cells.map((rows, index) => <tr key={index}>{this.renderCols(rows, index)}</tr>);

  render(): JSX.Element {
    return (
      <div>
        <table>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
