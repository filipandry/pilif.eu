import React, { Component } from 'react';

import Front from 'components/front/Front';
import Back from 'components/back/Back';
import 'components/card/Card.css';

export default class Card extends Component {
    render() {
        var {name, job, ...contacts} = this.props;
        return (
        <div className='card'>
            <div className='inner-card'>
                <Front title={name} />
                <Back title={name} subtitle={job} contacts={contacts} />
            </div>
        </div>
        );
    }
}