import React, { Component } from 'react';
import injectSheet from 'react-jss'
import ChevronUpIcon from 'mdi-react/ChevronUpIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

const styles = theme => ({
    root: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "50px",
        //background: "#fff",
        textAlign: "center;"
    },
    inner: {
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
    },
    button: {
        cursor: "pointer",
    },
    page:{
        display: "block",
    }
});


class PageIndicator extends Component {
    render() {
        var {classes,page, onPageUp, onPageDown} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.inner}>
                    <ChevronUpIcon className={classes.button} onClick={onPageUp}/>
                    <span className={classes.page}>{page+1}</span>
                    <ChevronDownIcon className={classes.button} onClick={onPageDown}/>
                </div>
            </div>
        );
    }
}


export default injectSheet(styles)(PageIndicator);