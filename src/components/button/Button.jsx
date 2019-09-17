import React, { Component } from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        display: 'block',
        marginLeft: props => props.spacing || 'auto',
        marginRight: props => props.spacing || 'auto',
        marginTop: props => props.marginTop || 0,
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
    constructor(props){
        super(props);
        this.span = React.createRef();
    }
    getCoords = (elem) => { // crossbrowser version
        var box = elem.getBoundingClientRect();
    
        var body = document.body;
        var docEl = document.documentElement;
    
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    
        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
    
        return { top: Math.round(top), left: Math.round(left), width: box.width, height: box.height };
    }
    getBounds = () =>{
        return this.getCoords(this.span.current);
    }
    render() {
        var {classes, label, onClick, fullWidth, inline, id} = this.props;
        return (
            <span ref={this.span} id={id} className={classNames(classes.root, { [classes.fullWidth]: fullWidth, [classes.inline]: inline })} onClick={onClick}>
                {label}
            </span>
        );
    }
}

export default injectSheet(styles)(Button);