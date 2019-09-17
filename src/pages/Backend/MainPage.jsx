import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Header from '../../components/backend/Header';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Projects from './Projects';
import Users from './Users';
import Dashboard from './Dashboard';
import Project from './Project';

const styles = theme => ({
    root: {
    },
    container: {
        fontSize: 0,
        height: 'calc(100vh - 54px)',
        width: '100vw',
        '& > div':{
            fontSize: 'initial',
            display: 'inline-block',
            height: '100%',
            verticalAlign: 'top',
        }
    },
    sidebar: {
        width: '300px',
        background: theme.colorSecondary,
        '&> a':{
            display: 'block',
            width: '100%',
            padding: 5
        }
    },
    content: {
        width: 'calc(100vw - 300px)',
    }
});

class MainPage extends Component {
    render() {
        var { classes } = this.props;
        return (
            <div className={classes.root}>
                <Header />
                <div className={classes.container}>
                    <div className={classes.sidebar}>
                        <Link to="/backend">Dashboard</Link>
                        <Link to="/backend/projects">Projects</Link>
                        <Link to="/backend/Users">Users</Link>
                    </div>
                    <div className={classes.content}>
                        <Route path='/backend/projects' exact component={Projects} />
                        <Route path='/backend/project' exact component={Project} />
                        <Route path='/backend/project/:id' exact component={Project} />
                        <Route path='/backend/users' exact component={Users} />
                        <Route path='/backend' exact component={Dashboard} />
                    </div>
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(MainPage);