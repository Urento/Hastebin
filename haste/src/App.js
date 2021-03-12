import React from "react";
import "./App.css";
import { Container, Form, Button } from "react-bootstrap";
import FooterTemplate from "./components/Footer";

const uniqid = require("uniqid");

const crypto = require("crypto");

const ENCRYPTION_KEY = "QfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5"; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

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

  encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  handleSubmit(e) {
    e.preventDefault();

    const { content, id } = this.state;

    const hastebin = {
      content,
      id,
    };

    const generatedId = uniqid();

    if (hastebin.content === "") return;

    const dataObject = {
      id: generatedId,
      content: this.encrypt(hastebin.content),
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

    const { history } = this.props;

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
        <FooterTemplate />
      </Container>
    );
  }
}
