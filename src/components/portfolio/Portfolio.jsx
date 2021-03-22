import React, { Component } from "react";
import injectSheet from "react-jss";
import PortfolioItem from "./PortfolioItem";

const styles = (theme) => ({
  root: {
    textAlign: "center"
  }
});

class Portfolio extends Component {
  render() {
    var { classes, items } = this.props;

    var content = <p>There is no content yer</p>;
    if (items && items.length > 0) {
      content = items.map((item) => {
        return <PortfolioItem key={item.id} item={item} />;
      });
    }

    return <div className={classes.root}>{content}</div>;
  }
}

export default injectSheet(styles)(Portfolio);
