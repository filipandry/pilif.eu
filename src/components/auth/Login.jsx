import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';
import withAuthentication from './session/withAuthentications';


const styles = theme => ({
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
        const {
          email,
          password,
          error,
        } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
               
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

                {error && <p>{error.message}</p>}
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