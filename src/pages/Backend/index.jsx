import React, { Component } from 'react';

import {compose} from 'recompose';
import withAuthentication from 'components/auth/session/withAuthentications';
import { withFirebase } from 'components/firebase';

import injectSheet from 'react-jss'
import { Login } from 'components/auth';
import MainPage from './MainPage';

const styles = theme => ({
    
});

class Backend extends Component {

    renderLogin() {
        return <Login />
    }
    renderBackend() {
        return <MainPage />;
    }

    render() {
        var { user } = this.props;
        var ui = this.renderLogin();
        if(user){
            ui = this.renderBackend();
        }
        return ui;
    }
}

const composer = compose(
    injectSheet(styles),
    withFirebase,
    withAuthentication
  );
  export default composer(Backend);