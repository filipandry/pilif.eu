import React, { Component } from 'react';
import injectSheet from 'react-jss'
import ExpandingPanel from '../expandingPanel/ExpandingPanel';

const styles = theme => ({
    root: {
        display: "inline-block",
        verticalAlign: "top",
        width: "20vw",
        padding: "10px",
    },
    inner: {
        cursor: "pointer",
        background: theme.colorPrimaryLighter,
        color: theme.colorSecondary,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.6)',
        fontSize: 0,
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
        this.item = React.createRef();
        this.state = {
            pos: false,
        }
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
        return this.getCoords(this.item.current);
    }
    onMoreClick = () =>{
        var bounds = this.getBounds();
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
        var image = item.images && item.images.length > 1 && item.images[1].image;
        return (
            <div className={classes.root}>
                <div ref={this.item} className={classes.inner}  onClick={this.onMoreClick}>
                    <img src={image} className={classes.image} alt={item.title} />
                </div>
                {pos && <ExpandingPanel {...exp} onClose={this.onDetailsClose} data={item}/>}
            </div>
        );
    }
}


export default injectSheet(styles)(PortfolioItem);