import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';
import withAuthentication from './session/withAuthentications';


const styles = theme => ({
  root:{
    float: 'right',
    color: theme.fontColorSecondary
  },
  button:{
    margin: '0 5px',
    textDecoration: 'none',
    color: theme.colorPrimary,
    cursor: 'pointer',
    '&:visited':{
        color: theme.colorPrimary,
    },
    '&:hover':{
        color: theme.colorPrimaryLighter,
    }
  }
});
const INITIAL_STATE = {
    error: null,
  };

class SignOut extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }
    onLogout = event => {
        this.props.firebase
          .doSignOut()
          .catch(error => {
            this.setState({ error });
          });
      };
    render() {
        var { classes, user } = this.props;
        const { error } = this.state;
        if(!user){
          return <span></span>
        }
        return (
          <div className={classes.root}>
            <span>{user.displayName || user.email}</span>
            <span className={classes.button} onClick={this.onLogout}>Logout</span>
            {error && <p>{error.message}</p>}
          </div>
        );
    }
}

const composer = compose(
  injectSheet(styles),
  withFirebase,
  withAuthentication
);

export default composer(SignOut);