import React, { Component } from 'react';

import './Page.css'

export default class Page extends Component {
    render() {
        var {color} = this.props;
        return (
            <div className="page" style={{backgroundColor: color}}>
                {this.props.children}
            </div>
        );
    }
}