import React, { Component } from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import { SignOut } from "../auth";

const styles = (theme) => ({
  "@global": {
    a: {
      textDecoration: "none",
      color: theme.colorPrimary,
      "&:visited": {
        color: theme.colorPrimary
      },
      "&:hover": {
        color: theme.colorPrimaryLighter
      }
    }
  },
  root: {
    width: "100%",
    padding: 15,
    //height: 50,
    background: theme.colorSecondary
  }
});

class Header extends Component {
  render() {
    var { classes } = this.props;
    return (
      <div className={classes.root}>
        <Link to="/">Home</Link>
        <SignOut />
      </div>
    );
  }
}

export default injectSheet(styles)(Header);
