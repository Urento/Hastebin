import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import NavbarTemplate from "./components/Navbar";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <NavbarTemplate />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
