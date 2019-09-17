import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Button from '../button/Button';
import ExpandingPanel from '../expandingPanel/ExpandingPanel';

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
        '& > p':{
            minHeight: 150,
            maxHeight: 150,
        }
    },
    panel: {
        position: 'absolute',
        background: theme.colorSecondary,
        border: `1px solid ${theme.colorPrimary}`
    }
});


class PortfolioItem extends Component {
    constructor(props){
        super(props);
        this.button = React.createRef();
        this.state = {
            pos: false,
        }
    }
    onMoreClick = () =>{
        var bounds = this.button.current.getBounds();
        console.log(bounds);
        this.setState({pos: bounds});
    }
    onDetailsClose = () =>{
        this.setState({pos: false});
    }
    render() {
        var { classes, item } = this.props;
        var { pos } = this.state;
        var style = pos && {
            top: pos.top,
            left: pos.left,
            width: pos.width,
            height: pos.height,
            widthEnd: window.innerWidth * 90 / 100,
            heightEnd: window.innerHeight * 90 / 100,
        };
        var { ...exp } = style;
        return (
            <div className={classes.root}>
                <div className={classes.inner}>
                    <img src={item.image} className={classes.image} alt={item.title}/>
                    <div className={classes.content}>
                        <span className={classes.title}>{item.title}</span>
                        <p>{item.text}</p>
                        <Button innerRef={this.button} label="More..." fullWidth onClick={this.onMoreClick} marginTop={40}/>
                    </div>
                </div>
                {pos && <ExpandingPanel {...exp} onClose={this.onDetailsClose} data={item}/>}
            </div>
        );
    }
}


export default injectSheet(styles)(PortfolioItem);