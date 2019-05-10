import React, { Component } from 'react';

import 'components/card/back/Back.css'

export default class Back extends Component {
    render() {
        var {title, subtitle, contacts} = this.props;
        var { email, website, linkedin} = contacts;
        return (
            <div className="back">
            <h2 className="name">{title}</h2>
            <p className="subtitle">{subtitle}</p>
            <div className="contacts">
                <p className="contact"><span className="contact-label">E-mail:</span> <a href={"mailto:" + email}>{email}</a></p>
                <p className="contact"><span className="contact-label">Web:</span> <a href={website}>{website}</a></p>
                <p className="contact"><span className="contact-label">Linkedin:</span> <a href={"https://www.linkedin.com/in/" + linkedin}>Profile</a></p>
            </div>
            </div>
        );
    }
}