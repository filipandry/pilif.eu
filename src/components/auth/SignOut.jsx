import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';
import withAuthentication from './session/withAuthentications';


const styles = theme => ({
});
const INITIAL_STATE = {
    error: null,
  };

class SignOut extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        this.props.firebase
          .doSignOut()
          .catch(error => {
            this.setState({ error });
          });
    
        event.preventDefault();
      };
    render() {
        const {
          error,
        } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign Out</button>

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

export default composer(SignOut);