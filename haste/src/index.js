import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, BrowserRouter, Route, Switch} from 'react-router-dom';
import NavbarTemplate from "./components/Navbar";

ReactDOM.render(
  <BrowserRouter>
    <NavbarTemplate />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
