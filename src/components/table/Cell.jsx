import React, { Component } from 'react';
import injectSheet from 'react-jss'

const styles = theme => ({
    root: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: props => props.width || 150,
        float: props => props.float || 'unset',
    }
});

class Cell extends Component {
    render() {
        var { classes, label, component } = this.props;
        if(!component){
            component = <span />;
        }
        return (
            <component className={classes.root}>
                {label}
            </component>
        );
    }
}

export default injectSheet(styles)(Cell);