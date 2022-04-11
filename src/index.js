import React from "react";
import ReactDOM from "react-dom";
import * as Redux from "./redux/redux"
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";

document.querySelector('.load').remove()

ReactDOM.render(
  <Provider store={Redux.store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
