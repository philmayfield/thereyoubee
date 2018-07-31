import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import App from "./components/App";
import "./App.css";

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector("#root")
);
