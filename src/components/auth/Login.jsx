import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';
import withAuthentication from './session/withAuthentications';


const styles = theme => ({
  root: {
    position: 'absolute',
    width: 300,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    background: theme.colorSecondary,
    boxShadow: '0 0 10px rgba(0,0,0,0.6)',
    padding: 20,
    '& > *':{
      width: 'calc(100% - 10px)',
      border: 'none',
      padding: 10,
      boxSizing: 'border-box',
      margin: 5,
    },
    '& > button[type=submit]':{
      background: theme.colorPrimaryLighter,
      color: theme.fontColorPrimary,
      cursor: 'pointer',
    },
    '& > button[type=submit]:hover':{
      background: theme.colorPrimary,
      color: theme.fontColorPrimary,
    }

  },
  header: {
    width: 'calc(100% + 40px)',
    background: theme.colorPrimary,
    color: '#fff',
    display: 'block',
    margin: '-21px -20px 10px',
    //textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: theme.colorPrimary
  }
});
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onSubmit = event => {
        const { email, password } = this.state;
    
        this.props.firebase
          .doSignInWithEmailAndPassword(email, password)
          .then(authUser => {
            this.setState({ ...INITIAL_STATE });
          })
          .catch(error => {
            this.setState({ error });
          });
    
        event.preventDefault();
      };
    render() {
      var { classes } = this.props;
        const { email, password, error } = this.state;
        return (
            <form onSubmit={this.onSubmit} className={classes.root}>
               <span className={classes.header}>Login</span>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button type="submit">Login</button>

                {error && <p className={classes.error}>{error.message}</p>}
            </form>
        );
    }
}

const composer = compose(
  injectSheet(styles),
  withFirebase,
  withAuthentication
);

export default composer(Login);