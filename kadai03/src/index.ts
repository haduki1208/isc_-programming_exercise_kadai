import { MOUSEOVER, PATH_OF_QUEEN, CAN_NOT_PUT, USED } from './constants';
import './index.css';

interface ICell extends HTMLTableDataCellElement {
  x: number;
  y: number;
}

const cells: ICell[][] = [];
let canPut = false;

const refresh = (): void => {
  for (const row of cells) {
    for (const cell of row) {
      cell.classList.remove(MOUSEOVER, PATH_OF_QUEEN);
    }
  }
  canPut = false;
};

const isGameEnd = () => {
  if (document.querySelectorAll('.used').length === 8) {
    alert('クリア');
  } else if (document.querySelectorAll('.can-not-put').length === 64) {
    alert('ゲームオーバー');
  }
};

const onMouseOver = (e: MouseEvent): void => {
  const cell = <ICell>e.target;
  if (isUsedCell(cell)) {
    canPut = false;
    return;
  }
  cell.classList.add(MOUSEOVER);
  const infectedCell: ICell[] = detectAreaOfInfluence(cell, cells);
  if (!isUsedCells(infectedCell)) {
    for (const cell of infectedCell) {
      cell.classList.add(PATH_OF_QUEEN);
    }
    canPut = true;
  }
};

const onMouseOut = (e: MouseEvent): void => {
  refresh();
};

const onClick = (e: MouseEvent): void => {
  if (!canPut) {
    return;
  }
  const cell = <ICell>e.target;
  cell.classList.add(USED, CAN_NOT_PUT);
  const infectedCell: ICell[] = detectAreaOfInfluence(cell, cells);
  for (const cell of infectedCell) {
    cell.classList.add(CAN_NOT_PUT);
  }
  isGameEnd();
  refresh();
};

const detectAreaOfInfluence = (cell: ICell, cells: ICell[][]): ICell[] => {
  const infectedCell: ICell[] = [];
  const directions: number[][] = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  for (const direction of directions) {
    let [currentX, currentY] = [cell.x, cell.y];
    while (true) {
      currentX += direction[0];
      currentY += direction[1];
      if (currentX < 0 || currentX > 7 || currentY < 0 || currentY > 7) {
        break;
      }
      infectedCell.push(cells[currentX][currentY]);
    }
  }
  return infectedCell;
};

const isUsedCell = (cell: ICell): boolean => {
  return cell.classList.contains(USED);
};

const isUsedCells = (cells: ICell[]): boolean => {
  return cells.some(isUsedCell);
};

const initGame = (): void => {
  const table: HTMLTableSectionElement = <HTMLTableSectionElement>document.querySelector('tbody');
  for (let x = 0; x < 8; x++) {
    const tr: HTMLTableRowElement = <HTMLTableRowElement>document.createElement('tr');
    cells.push([]);
    for (let y = 0; y < 8; y++) {
      const td: ICell = <ICell>document.createElement('td');
      td.x = x;
      td.y = y;
      td.addEventListener('mouseover', onMouseOver);
      td.addEventListener('mouseout', onMouseOut);
      td.addEventListener('click', onClick);
      tr.appendChild(td);
      cells[x].push(td);
    }
    table.appendChild(tr);
  }
};

initGame();
