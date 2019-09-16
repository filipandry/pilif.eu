import React, { Component } from 'react';
import injectSheet from 'react-jss'

import Portfolio from 'components/portfolio/Portfolio';
import Item from "components/info/Item";
import Button from "components/button/Button";
import Pagination from '../pagination/Pagination';

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
        this.state={
            width:0,
            currentItem:false,
            page: 1
        }
    }
    componentDidMount() {
        if(this.Container.current){
            //console.log(this.Container.current);
            this.setState({width:this.Container.current.clientWidth});
        }
    }
    onItemClick = (item) =>() =>{
        console.log(item);
        this.setState({currentItem: item, page:1});
    }
    onPageChange = (newPage, oldPage) =>{
        this.setState({page: newPage});
    }
    render() {
        var {classes,data} = this.props;
        var {width, currentItem, page} = this.state;
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
                    <Portfolio items={currentItem.items.slice((page-1) * 4,(page-1) * 4 + 4)} />
                    <span className={classes.afterContent}></span>
                </div>}
                {currentItem && currentItem.items.length > 4 && <Pagination count={Math.ceil(currentItem.items.length / 4)} page={page} onPageChange={this.onPageChange} />}
            </div>
        );
    }
}

export default injectSheet(styles)(Info);