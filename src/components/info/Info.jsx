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
            page: 1
        }
    }
    onPageChange = (newPage, oldPage) =>{
        this.setState({page: newPage});
    }
    render() {
        var {classes,item} = this.props;
        var {page} = this.state;
        
        return (
            <div className={classes.root} ref={this.Container}>
                
                <Item data={item} />
                
                <div className={classes.current}>
                    <span className={classes.beforeContent}></span>
                    <Portfolio items={item.items.slice((page-1) * 4,(page-1) * 4 + 4)} />
                    <span className={classes.afterContent}></span>
                </div>
                {item.items.length > 4 && <Pagination count={Math.ceil(item.items.length / 4)} page={page} onPageChange={this.onPageChange} />}
            </div>
        );
    }
}

export default injectSheet(styles)(Info);