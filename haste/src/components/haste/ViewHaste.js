import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const uniqid = require("uniqid");

export default class ViewHaste extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "Loading...",
      id: this.props.match.params.id,
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/haste/" + this.state.id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ content: data.content });
        this.setState({
          isLoaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoaded: true });
        this.setState({ error: error });
      });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Fehler: {this.state.error.message}</h1>
        </div>
      );
    } else if (!this.state.isLoaded) {
      return <div>Loading... </div>;
    } else {
      return (
        <Container className="p-3">
          <Form>
            <Form.Group>
              <Form.Control
                defaultValue={this.state.content}
                id="content"
                as="textarea"
                rows={20}
              />
            </Form.Group>
          </Form>
        </Container>
      );
    }
  }
}
