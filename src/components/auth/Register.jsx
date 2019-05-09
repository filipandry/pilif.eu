import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';
import withAuthentication from './session/withAuthentications';


const styles = theme => ({
});
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
    
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
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
          username,
          email,
          passwordOne,
          passwordTwo,
          error,
        } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">Sign Up</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}


var composer = compose(
    injectSheet(styles),
    withFirebase,
    withAuthentication,
);
export default composer(Register);