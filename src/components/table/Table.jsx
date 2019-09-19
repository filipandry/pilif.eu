import React, { Component } from 'react';
import injectSheet from 'react-jss'
import RowHeader from './RowHeader';
import Row from './Row';

const styles = theme => ({
    root: {

    }
});

class Table extends Component {
    render() {
        var { classes, columns, data } = this.props;
        return (
            <div className={classes.root}>
                <RowHeader columns={columns} />
                <div>
                    {data && data.map((row,index) => (<Row key={index} data={row} columns={columns}/>) )}
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(Table);