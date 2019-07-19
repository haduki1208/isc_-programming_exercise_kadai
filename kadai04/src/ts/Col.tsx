import React from "react";
import { ICell } from "./constants";

interface IProps {
  col: ICell;
}

const Col: React.FC<IProps> = (props: IProps): JSX.Element => {
  return <td className={props.col.state} />;
};

export default Col;
