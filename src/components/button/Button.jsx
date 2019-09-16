import React, { Component } from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        display: 'block',
        marginLeft: props => props.spacing || 'auto',
        marginRight: props => props.spacing || 'auto',
        marginTop: 40,
        textAlign: 'center',
        padding: 8,
        background: props => props.color==="primary" ? theme.colorPrimary : theme.colorSecondary,
        border: "1px solid " + theme.colorSecondary,
        color: props => props.color==="primary" ? theme.fontColorPrimary : theme.fontColorSecondary,
        fontSize: 14,
        cursor: 'pointer',
        '&:hover':{
            background: props => props.color==="primary" ? theme.colorPrimaryLighter : theme.colorSecondaryLighter
        },
        minWidth: props => props.minWidth || "initial",
        width: 'fit-content',
    },
    fullWidth: {
        width: '90%',
    },
    inline:{
        display: "inline-block",
    }
});

class Button extends Component {
    render() {
        var {classes, label, onClick, fullWidth, inline} = this.props;
        return (
            <span className={classNames(classes.root, { [classes.fullWidth]: fullWidth, [classes.inline]: inline })} onClick={onClick}>
                {label}
            </span>
        );
    }
}

export default injectSheet(styles)(Button);