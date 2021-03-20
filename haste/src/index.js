import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import NavbarTemplate from "./components/navbar/Navbar";
require("dotenv").config();

ReactDOM.render(
  <BrowserRouter>
    <NavbarTemplate />
  </BrowserRouter>,
  document.getElementById("root")
);
