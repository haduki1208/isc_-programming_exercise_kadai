import React from "react";
import Col from "./Col";
import { ICell } from "./constants";

interface IProps {
  row: ICell[];
}

const Row: React.FC<IProps> = (props: IProps): JSX.Element => {
  return (
    <tr>
      {props.row.map(
        (col: ICell, index: number): JSX.Element => {
          return <Col key={index} col={col} />;
        }
      )}
    </tr>
  );
};

export default Row;
