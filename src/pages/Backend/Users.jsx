import React, { Component } from "react";
import { compose } from "recompose";
import injectSheet from "react-jss";
import withAuthentication from "../../components/auth/session/withAuthentications";
import { withFirebase } from "../../components/firebase";

const styles = (theme) => ({
  root: {}
});
class Users extends Component {
  render() {
    var { classes } = this.props;

    return <div className={classes.root}>Users</div>;
  }
}

const composer = compose(injectSheet(styles), withFirebase, withAuthentication);
export default composer(Users);
