import React, {Component} from 'react';
import {compose} from 'recompose';
import withAuthentication from 'components/auth/session/withAuthentications';
import { withFirebase } from 'components/firebase';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from 'pages/Home';
import Backend from 'pages/Backend';
import PageNotFound from 'pages/PageNotFound';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/backend" component={Backend} />
          <Route exact component={PageNotFound} />
        </Switch>
    </Router>
    );
  }
}

const composer = compose(
  withFirebase,
  withAuthentication
);
export default composer(App);