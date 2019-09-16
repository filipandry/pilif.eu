import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Button from '../button/Button';

const styles = theme => ({
    root: {
        display: "inline-block",
        verticalAlign: "top",
        width: "25%",
        padding: "10px",
    },
    inner: {
        // border: "1px solid",
        //borderRadius: "10px",
        // padding: "10px",
        background: theme.colorPrimaryLighter,
        color: theme.colorSecondary,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.6)',
        fontSize: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        display: 'block',
    },
    image: {
        //borderTopLeftRadius: "10px",
        //borderTopRightRadius: "10px",
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
        console.log(item);
        return (
            <div className={classes.root}>
                <div className={classes.inner}>
                    <img src={item.image} className={classes.image} alt={item.title}/>
                    <div className={classes.content}>
                        <span className={classes.title}>{item.title}</span>
                        <p>{item.text}</p>
                        <Button label="More..." fullWidth />
                    </div>
                </div>
            </div>
        );
    }
}


export default injectSheet(styles)(PortfolioItem);