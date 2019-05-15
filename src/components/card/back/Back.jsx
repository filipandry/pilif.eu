import React, { Component } from 'react';

import 'components/card/back/Back.css'

export default class Back extends Component {
    render() {
        var {title, subtitle, contacts} = this.props;
        //var { email, website, linkedin} = contacts;
        return (
            <div className="back">
            <h2 className="name">{title}</h2>
            <p className="subtitle">{subtitle}</p>
            <div className="contacts">
                {contacts.map((item, index) => <p key={index} className="contact"><span className="contact-label">{item.label}:</span> <a href={item.link}>{item.text}</a></p>)}
                
            </div>
            </div>
        );
    }
}