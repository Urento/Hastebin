import React from "react";
import { NavDropdown } from "react-bootstrap";

export default class FooterTemplate extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>
          &copy; Developed by <a href="https://github.com/urento/">Urento</a>
        </p>
      </div>
    );
  }
}
