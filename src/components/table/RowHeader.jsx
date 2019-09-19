import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Cell from './Cell';

const styles = theme => ({
    root: {
        padding: 10,
        width: '100%',
        background: theme.colorSecondary,
        color: theme.fontColorSecondary,
        '&> span':{
            display: 'inline-block',
            width: 150,
            overflow: 'hidden',
        }
    }
});

class RowHeader extends Component {
    render() {
        var { classes, columns } = this.props;
        return (
            <div className={classes.root}>
                {columns.map((col,index) => (<Cell label={col.label} width={col.width} float={col.float} />) )}
            </div>
        );
    }
}

export default injectSheet(styles)(RowHeader);