import React, { Component } from "react";

import "./Front.css";

export default class Front extends Component {
  render() {
    var { title } = this.props;
    return (
      <div className="front">
        <h1 className="title">{title}</h1>
      </div>
    );
  }
}
