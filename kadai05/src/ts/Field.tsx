import React from "react";

type TBlockType = "wall" | "road" | "player";
interface IBlock {
  blockType: TBlockType;
}

interface IProps {}
interface IState {
  maxY: number;
  maxX: number;
  field: IBlock[][];
}

export default class Field extends React.Component<IProps, IState> {
  state = {
    maxY: 25,
    maxX: 25,
    field: [] as IBlock[][]
  };

  componentDidMount(): void {
    let newField: IBlock[][] = [];
    for (let y = 0; y < this.state.maxY; y++) {
      newField.push([]);
      for (let x = 0; x < this.state.maxX; x++) {
        newField[y].push({ blockType: "road" });
      }
    }

    for (let y = 0; y < this.state.maxY; y++) {
      newField[y][0].blockType = "wall";
      newField[y][this.state.maxX - 1].blockType = "wall";
    }
    for (let x = 0; x < this.state.maxX; x++) {
      newField[0][x].blockType = "wall";
      newField[this.state.maxY - 1][x].blockType = "wall";
    }

    for (let x = 2; x < this.state.maxX - 2; x += 2) {
      newField[2][x].blockType = "wall";
      const directions: number[][] = [];
      if (newField[2 - 1][x].blockType === "road") {
        directions.push([-1, 0]);
      }
      if (newField[2 + 1][x].blockType === "road") {
        directions.push([1, 0]);
      }
      if (newField[2][x - 1].blockType === "road") {
        directions.push([0, -1]);
      }
      if (newField[2][x + 1].blockType === "road") {
        directions.push([0, 1]);
      }
      const [_y, _x] = directions[
        Math.floor(Math.random() * directions.length)
      ];
      newField[2 + _y][x + _x].blockType = "wall";
    }

    for (let y = 4; y < this.state.maxY - 2; y += 2) {
      for (let x = 2; x < this.state.maxX - 2; x += 2) {
        newField[y][x].blockType = "wall";
        const directions: number[][] = [];
        if (newField[y + 1][x].blockType === "road") {
          directions.push([1, 0]);
        }
        if (newField[y][x - 1].blockType === "road") {
          directions.push([0, -1]);
        }
        if (newField[y][x + 1].blockType === "road") {
          directions.push([0, 1]);
        }
        const [_y, _x] = directions[
          Math.floor(Math.random() * directions.length)
        ];
        newField[y + _y][x + _x].blockType = "wall";
      }
    }

    this.setState({ field: newField });
  }

  renderCol = (blocks: IBlock[]): JSX.Element[] => {
    return blocks.map(
      (block: IBlock, index: number): JSX.Element => {
        return <td key={index} className={block.blockType} />;
      }
    );
  };

  renderRow = (field: IBlock[][]): JSX.Element[] => {
    return field.map(
      (blocks: IBlock[], index: number): JSX.Element => {
        return <tr key={index}>{this.renderCol(blocks)}</tr>;
      }
    );
  };

  render(): JSX.Element {
    return (
      <table>
        <tbody>{this.renderRow(this.state.field)}</tbody>
      </table>
    );
  }
}
