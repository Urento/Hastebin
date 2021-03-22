import React from "react";
import "./App.css";
import { Container, Form, Button } from "react-bootstrap";
import FooterTemplate from "./components/footer/Footer";
import { Translate } from "./components/language/Language";

require("dotenv").config();
const uniqid = require("uniqid");
const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;
const IV_LENGTH = 16;

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
    const { history } = this.props;

    const hastebin = {
      content,
      id,
    };

    const generatedId = uniqid();

    //TODO: Add Custom Filter
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

    fetch(
      process.env.REACT_APP_HTTP_OR_HTTPS +
        "://" +
        process.env.REACT_APP_HOSTNAME +
        ":8080/haste",
      requestOptions
    ).catch((err) => {
      console.error(err);
    });

    setTimeout(() => {
      history.push("/v/" + generatedId);
    }, 500);
  }

  render() {
    return (
      <Container className="p-3">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            {window.localStorage.getItem("theme") === "light" ? (
              <Form.Control
                onChange={this.handleChange}
                id="content"
                as="textarea"
                rows={20}
              />
            ) : (
              <Form.Control
                onChange={this.handleChange}
                id="content"
                as="textarea"
                style={{ backgroundColor: "#363537", color: "#FAFAFA" }}
                rows={20}
              />
            )}
          </Form.Group>
          <Button type="submit" variant="primary">
            {Translate("createButton")}
          </Button>
        </Form>
        <FooterTemplate />
      </Container>
    );
  }
}
