import React from "react";
import Row from "./Row";
import { ICell, TState } from "./constants";

interface IProps {}
interface IState {
  maxX: number;
  maxY: number;
  cells: ICell[][];
}

const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

export default class Table extends React.Component<IProps, IState> {
  timer: NodeJS.Timer | number = 0;

  state = {
    maxX: 40,
    maxY: 20,
    cells: [] as ICell[][]
  };

  componentDidMount(): void {
    const cells: ICell[][] = [];
    for (let y = 0; y < this.state.maxY; y++) {
      cells.push([]);
      for (let x = 0; x < this.state.maxX; x++) {
        cells[y].push({
          state: Math.random() < 0.5 ? "alive" : "dead",
          nextState: "unknown"
        });
      }
    }
    this.setState({ cells });

    this.timer = setInterval((): void => {
      this.goNextGeneration();
    }, 500);
  }

  componentWillUnmount(): void {
    clearInterval(this.timer as number);
  }

  goNextGeneration = (): void => {
    const cells: ICell[][] = this.state.cells
      .map(
        (row: ICell[], y: number): ICell[] => {
          return row.map(
            (col: ICell, x: number): ICell => {
              col.nextState = this.getNextCellState(col.state, y, x);
              return col;
            }
          );
        }
      )
      .map(
        (row: ICell[]): ICell[] => {
          return row.map(
            (col: ICell): ICell => {
              col.state = col.nextState;
              col.nextState = "unknown";
              return col;
            }
          );
        }
      );

    this.setState({ cells });
  };

  getNextCellState = (currentState: TState, y: number, x: number): TState => {
    let aliveCount = 0;
    DIRECTIONS.forEach((item: number[]) => {
      if (
        y + item[1] < 0 ||
        x + item[0] < 0 ||
        y + item[1] >= this.state.maxY ||
        x + item[0] >= this.state.maxX
      ) {
        return;
      }
      if (this.state.cells[y + item[1]][x + item[0]].state === "alive") {
        aliveCount++;
      }
    });

    if (aliveCount === 3) {
      // 誕生・生存
      return "alive";
    }
    if (aliveCount === 2) {
      // 維持
      return currentState;
    }
    // 過疎・過密
    return "dead";
  };

  render(): JSX.Element {
    return (
      <table>
        <tbody>
          {this.state.cells.map(
            (row: ICell[], index: number): JSX.Element => {
              return <Row row={row} key={index} />;
            }
          )}
        </tbody>
      </table>
    );
  }
}
