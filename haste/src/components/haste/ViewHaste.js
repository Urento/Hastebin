import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import FooterTemplate from "../Footer";

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

  downloadTxtFile = (e) => {
    e.preventDefault();
    const element = document.createElement("a");
    const file = new Blob([document.getElementById('content').value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = this.state.id+".txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
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
          <Button type="submit" variant="primary" onClick={this.downloadTxtFile} style={{float:"right"}}>
              Download
            </Button><br/><br/>
            <Form.Group>
              <Form.Control
                defaultValue={this.state.content}
                id="content"
                as="textarea"
                rows={20}
              />
            </Form.Group>
          </Form>
          <FooterTemplate/>
        </Container>
      );
    }
  }
}
