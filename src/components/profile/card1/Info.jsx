import React, { Component } from 'react';
import injectSheet from 'react-jss'

const styles = theme => ({
    
    infocard: {
        background: theme.colorPrimaryLighter,
        height: 60,
        marginTop: -60,
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
        opacity: 0,
        transition: "opacity 0.2s linear, margin-top 0.2s linear",
        zIndex: 10,
    },
    infocardshow: {
        opacity: 1,
        marginTop: 20,
        transition: "opacity 0.1s linear, margin-top 0.2s linear",
    },
  
    infoIcon: {
        position: "relative",
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        "& > *":{
            display: "inline-block",
            verticalAlign: "middle",
        },
        "& > span":{
            marginLeft: 10,
        }
    }
});

class Info extends Component {
    render() {
        var { classes, show, icon, link, text } = this.props;
        return (
            <div className={classes.infocard + " " + (show ? classes.infocardshow : "")}>
                <div className={classes.infoIcon}>
                    {icon}
                    <span><a href={link} target="blank">{text}</a></span>
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(Info);