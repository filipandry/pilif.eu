import React, { Component } from 'react';

import Front from 'components/card/front/Front';
import Back from 'components/card/back/Back';
import 'components/card/Card.css';

export default class Card extends Component {
    render() {
        var {name, title, contacts} = this.props;
        return (
        <div className='card'>
            <div className='inner-card'>
                <Front title={name} />
                <Back title={name} subtitle={title} contacts={contacts} />
            </div>
        </div>
        );
    }
}