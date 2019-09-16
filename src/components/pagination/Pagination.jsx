import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Button from '../button/Button';

const styles = theme => ({
    root: {
        margin: "0 auto",
        width: "fit-content",
    }
});
class Pagination extends Component {
    onPageClick = (newPage) => () =>{
        var { onPageChange, count, page } = this.props;
        if(onPageChange){
            if(newPage > count){
                newPage = count;
            }
            if(newPage<1){
                newPage = 1;
            }

            if(newPage !== page){
                onPageChange(newPage,page);
            }
        }
    }
    render() {
        var { classes, count, page } = this.props;
        if(page > count){
            page = count;
        }
        var min = page -1;
        var max = page +1;
        if(min <1){
            min = 1;
        }
        if(max > count){
            max = count;
        }
        console.log([min,max]);
        var items = Array(max - min + 1).fill().map((i,index) => <Button key={index} label={index+min} color={index+min === page ? "primary" : "default"} inline minWidth={50} spacing={2} onClick={this.onPageClick(index+min)} />);
        var before = min !== 1 && <span>...</span>;
        var after = max !== count && <span>...</span>;
        return (
            <div className={classes.root}>
                <Button label="<<" inline minWidth={50} spacing={2} onClick={this.onPageClick(1)} />
                <Button label="<" inline minWidth={50} spacing={2} onClick={this.onPageClick(page-1)}/>
                {before}
                {items}
                {after}
                <Button label=">" inline minWidth={50} spacing={2} onClick={this.onPageClick(page+1)}/>
                <Button label=">>" inline minWidth={50} spacing={2} onClick={this.onPageClick(count)}/>
            </div>
        );
    }
}

export default injectSheet(styles)(Pagination);