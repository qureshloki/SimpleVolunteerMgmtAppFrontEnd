import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
