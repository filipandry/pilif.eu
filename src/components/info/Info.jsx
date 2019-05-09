import React, { Component } from 'react';
import injectSheet from 'react-jss'

import Item from "components/info/Item";

const styles = theme => ({
    root: {
        position: "relative",
        width: "70%",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop:"50px",
    },
    current: {
        padding: "50px 0",
    },
    beforeContent: {
        position: "relative",
        margin: "15px auto",
        display: "block",
        width: "50px",
        height: "2px",
        background: theme.colorSecondary
    },
    afterContent: {
        position: "relative",
        margin: "15px auto",
        display: "block",
        width: "50px",
        height: "2px",
        background: theme.colorSecondary
    }
});

class Info extends Component {
    constructor(props){
        super(props);
        this.Container = React.createRef();
    }
    state={
        width:0,
        currentItem:false,
    }
    componentDidMount() {
        if(this.Container.current){
            //console.log(this.Container.current);
            this.setState({width:this.Container.current.clientWidth});
        }
    }
    onItemClick = (item) =>() =>{
        console.log(item);
        this.setState({currentItem: item});
    }
    render() {
        var {classes,data} = this.props;
        var {width, currentItem} = this.state;
        if(!currentItem && data && data.length > 0){
            currentItem = data[0];
        }
        return (
            <div className={classes.root} ref={this.Container}>
                {data.map((item, index) =>{
                    return (
                        <Item key={index}width={width/4} data={item} onClick={this.onItemClick(item)} isSelected={currentItem && currentItem.id === item.id}/>
                    );
                })}
                {currentItem && <div className={classes.current}>
                    <span className={classes.beforeContent}></span>
                    {currentItem.content}
                    <span className={classes.afterContent}></span>
                </div>}
            </div>
        );
    }
}

export default injectSheet(styles)(Info);