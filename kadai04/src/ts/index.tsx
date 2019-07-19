import React from "react";
import ReactDOM from "react-dom";
import Table from "./Table";
import "../scss/index.scss";

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <h1>Life Game</h1>
      <Table />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
