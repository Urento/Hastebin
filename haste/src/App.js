import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, Form, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import FooterTemplate from "./components/Footer";

const uniqid = require("uniqid");


// encrypt data 

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      id: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { content, id } = this.state;

    const hastebin = {
      content,
      id,
    };

    const generatedId = uniqid();

    if(hastebin.content === "") return

    const dataObject = {
      id: generatedId,
      content: hastebin.content,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObject),
    };

    fetch("http://localhost:8080/haste", requestOptions)
      .then(() => console.log("Haste created " + generatedId))
      .catch((err) => {
        console.error(err);
      });

      const {history} = this.props;

    setTimeout(() => {
      history.push("/v/" + generatedId);
    }, 500);
  }

  render() {
    return (
        <Container className="p-3">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control
                onChange={this.handleChange}
                id="content"
                as="textarea"
                rows={20}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </Form>
          <FooterTemplate/>
        </Container>
    );
  }
}
