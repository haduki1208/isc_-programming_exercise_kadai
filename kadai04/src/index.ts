import { TABLE_CONFIG, CELL_STATE } from './constants';
import './index.css';

interface CellState {
  readonly element: HTMLTableDataCellElement;
  readonly x: number;
  readonly y: number;
  current: string;
  feature: string;
}

const cellsState: CellState[][] = [];

const init = (): void => {
  const table: HTMLTableSectionElement = <HTMLTableSectionElement>document.querySelector('tbody');
  for (let x = 0; x < TABLE_CONFIG.MAX_X; x++) {
    const tr: HTMLTableRowElement = <HTMLTableRowElement>document.createElement('tr');
    const cellsRowStates: CellState[] = [];
    for (let y = 0; y < TABLE_CONFIG.MAX_Y; y++) {
      const td: HTMLTableDataCellElement = <HTMLTableDataCellElement>document.createElement('td');
      const cellState: CellState = {
        element: td,
        x,
        y,
        current: CELL_STATE.UNKNOWN,
        feature: Math.random() < 0.5 ? CELL_STATE.ALIVE : CELL_STATE.DEAD
      };
      tr.appendChild(td);
      cellsRowStates.push(cellState);
    }
    table.appendChild(tr);
    cellsState.push(cellsRowStates);
  }
};

const deadOrAlive = (cellState: CellState): string => {
  let aliveCount = 0;
  const directions: number[][] = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  for (const [addX, addY] of directions) {
    if (
      cellState.x + addX < 0 ||
      cellState.x + addX >= TABLE_CONFIG.MAX_X ||
      cellState.y + addY < 0 ||
      cellState.y + addY >= TABLE_CONFIG.MAX_Y
    ) {
      continue;
    }
    const cell = cellsState[cellState.x + addX][cellState.y + addY];
    if (cell.current === CELL_STATE.ALIVE) {
      aliveCount++;
    }
  }

  if (cellState.current === CELL_STATE.ALIVE && (aliveCount === 2 || aliveCount === 3)) {
    return CELL_STATE.ALIVE;
  }
  if (cellState.current === CELL_STATE.DEAD && aliveCount === 3) {
    return CELL_STATE.ALIVE;
  }
  return CELL_STATE.DEAD;
};

const render = (): void => {
  for (const row of cellsState) {
    for (const cell of row) {
      cell.current = cell.feature;
      cell.feature = CELL_STATE.UNKNOWN;
      cell.element.className = cell.current;
    }
  }
};

const main = (): void => {
  (<HTMLButtonElement>document.querySelector('#debugButton')).addEventListener('click', (): void => {
    console.log(cellsState);
  });

  init();
  render();

  const timer = setInterval(() => {
    for (const row of cellsState) {
      for (const cell of row) {
        cell.feature = deadOrAlive(cell);
      }
    }
    render();
  }, 100);
};

main();
