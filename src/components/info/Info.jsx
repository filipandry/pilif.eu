import React, { Component } from 'react';
import injectSheet from 'react-jss'

import Portfolio from 'components/portfolio/Portfolio';
import Item from "components/info/Item";
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
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '100%',
    },
    beforeContent: {
        position: "relative",
        margin: "15px auto",
        display: "block",
        width: "50px",
        height: "2px",
        background: props => props.color2,
    },
    afterContent: {
        position: "relative",
        margin: "15px auto",
        display: "block",
        width: "50px",
        height: "2px",
        background: props => props.color2,
    },
    back: {
        position: 'absolute',
        width: '55vw',
        height: '80vh',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        background: props => props.color,
        borderRadius: 20,
        boxShadow: '0 0 10px rgba(0,0,0,0.6)',
    }
});

class Info extends Component {
    constructor(props){
        super(props);
        this.Container = React.createRef();
        this.state={
            page: 1
        }
    }
    onPageChange = (newPage, oldPage) =>{
        this.setState({page: newPage});
    }
    render() {
        var {classes,item, color, color2} = this.props;
        var {page} = this.state;
        
        return (
            <div className={classes.root} ref={this.Container}>
                <div className={classes.back} />
                <Item data={item} color={color} color2={color2} />
                <div className={classes.current}>
                    <span className={classes.beforeContent}></span>
                    <Portfolio items={item.items.slice((page-1) * 4,(page-1) * 4 + 4)} />
                    <span className={classes.afterContent}></span>
                    {item.items.length > 4 && <Pagination count={Math.ceil(item.items.length / 4)} page={page} onPageChange={this.onPageChange} />}
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(Info);