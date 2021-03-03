import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import ViewHaste from "./haste/ViewHaste";
import App from "../App";

export default class NavbarTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Hastebin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">New Haste</Nav.Link>
            </Nav>
            <Form inline>
              <Button variant="outline-success">LOGIN</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/v/:id" component={ViewHaste} />
          </Switch>
        </Switch>
      </Router>
    );
  }
}
