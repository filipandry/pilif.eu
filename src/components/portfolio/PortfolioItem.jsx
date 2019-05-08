import React, { Component } from 'react';
import injectSheet from 'react-jss'

const styles = theme => ({
    root: {
        display: "inline-block",
        verticalAlign: "top",
        width: "25%",
        padding: "10px",
    },
    inner: {
        // border: "1px solid",
        borderRadius: "10px",
        // padding: "10px",
        background: theme.colorSecondary,
        color: theme.fontColorSecondary,
    },
    image: {
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        width: "100%",
        height: "auto",
    },
    content: {
        padding: "10px",
    }
});


class PortfolioItem extends Component {
    render() {
        var {classes, item} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.inner}>
                    <img src={item.image} className={classes.image} alt={item.title}/>
                    <div className={classes.content}>
                        {item.title}
                    </div>
                </div>
            </div>
        );
    }
}


export default injectSheet(styles)(PortfolioItem);