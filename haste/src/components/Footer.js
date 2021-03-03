import React from "react";

export default class FooterTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <p>&copy; Developed by <a href="https://github.com/janburzinski/">Jan Burzinski</a></p>
      </div>
    );
  }
}
