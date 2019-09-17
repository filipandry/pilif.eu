import React, { Component } from 'react';
import injectSheet from 'react-jss'

import color from 'color';


const styles = theme => ({
    item: {
        position: "relative",
        display: "block",
        verticalAlign: "top",
        width: 150,
        margin: "auto",
        perspective: props => props.width,
    },
    box: {
        position: "relative",
        width: 150,
        height: 30,
        border: "1px solid " + theme.colorSecondary,
        marginLeft: "auto",
        marginRight: "auto",
        background: theme.colorSecondary,
        color: theme.colorPrimary,
        transition: "transform .4s linear",
        transformStyle: "preserve-3d",
    },
    title: {
        position: "relative",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        display: "block",
        width: "fit-content",
    }
});

class Item extends Component {
    constructor(props){
        super(props);
        this.Container = React.createRef();
    }
    state={
        width:0,
    }
    componentDidMount() {
        if(this.Container.current){
            console.log(this.Container.current);
        }
    }
    render() {
        var {classes,data, onClick, isSelected} = this.props;
        var itemClasses = classes.item;
        var boxClasses = classes.box;
        if(isSelected){
            boxClasses += " " + classes.boxSelected;
        }
        return (
            <div className={itemClasses}>
                <div className={boxClasses} onClick={onClick}>
                    <span className={classes.title}>
                        {data.title}
                    </span>
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(Item);