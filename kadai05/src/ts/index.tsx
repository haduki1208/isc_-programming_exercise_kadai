import React from "react";
import ReactDOM from "react-dom";
import "../scss/index.scss";
import Field from "./Field";

const App: React.FC = (): JSX.Element => {
  return <Field />;
};

ReactDOM.render(<App />, document.getElementById("root"));
