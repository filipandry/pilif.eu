import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Cell from './Cell';

import color from 'color';

const styles = theme => ({
    root: {
        padding: 10,
        width: '100%',
        overflow: 'hidden',
        background: color(theme.colorPrimaryLighter).lighten(0.2).hsl().string(),
        color: theme.fontColorPrimary,
        maxHeight: 40,
        '&:nth-child(odd)':{
            background: color(theme.colorPrimaryLighter).lighten(0.25).hsl().string(),
            color: theme.fontColorPrimary,
        },
        '&:hover':{
            background: color(theme.colorPrimaryLighter).lighten(0.1).hsl().string(),
        },
        '&> span':{
            padding: '0 5px',
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
        }
    }
});

class Row extends Component {
    render() {
        var { classes, columns, data } = this.props;
        return (
            <div className={classes.root}>
                {columns.map((col,index) => { 
                    var label =!!col.customContent ?col.customContent(data) : data[col.key];
                    return (
                        <Cell key={index} label={label} width={col.width} float={col.float} />
                    );
                })}
            </div>
        );
    }
}

export default injectSheet(styles)(Row);