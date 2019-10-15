import React, { Component } from 'react';
import injectSheet from 'react-jss'
import PortfolioItem from 'components/portfolio/PortfolioItem';

const styles = theme => ({
    root: {
        textAlign: 'center',
        width: props => `calc(20vw * ${props.items.length})`,
        position: 'absolute',
        left: '50%',
        top: '50%',
        // transition: 'transform 0.1s ease',
    },
});


class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state={
            pos:0,
        }
    }
    mouseMove=(ev)=>{
        console.log(ev);
        var half = window.innerWidth / 2;
        var pointer = ev.screenX * -1;

        var mousePos =half-pointer;
        var pos= mousePos * 100 / window.innerWidth
        this.setState({pos: pos});
    }

    render() {
        var { classes, items } = this.props;
        var { pos } = this.state;
        var content =<p>There is no content yer</p>;
        if(items && items.length > 0){
            content =items.map((item) => {
                return (<PortfolioItem key={item.id} item={item} />)
            });
        }
        var style={
            transform: `translate(calc(-50% - ${pos}%), -50%)`,
        };
        return (
            <div className={classes.root} style={style} onMouseMove={this.mouseMove}>
                {content}
            </div>
        );
    }
}


export default injectSheet(styles)(Portfolio);