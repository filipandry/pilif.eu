import React, { Component } from "react";

import Front from "./front/Front";
import Back from "./back/Back";
import "./Card.css";

export default class Card extends Component {
  render() {
    var { name, title, contacts } = this.props;
    return (
      <div className="card">
        <div className="inner-card">
          <Front title={name} />
          <Back title={name} subtitle={title} contacts={contacts} />
        </div>
      </div>
    );
  }
}
