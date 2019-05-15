import React, { Component } from 'react';
import injectSheet from 'react-jss'

import Header from './Header';
import Info from './Info';

const styles = theme => ({
    root: {
        width: "100%",
        padding: "50px",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
    },
    inner: {
        width: "100%",
        maxWidth: 500,
        margin: "auto",
    },
   
});

class Card1 extends Component {
    state = {
        showContacts: false,
    }
    onContactClick = () =>{
        this.setState(state =>{
            state.showContacts = !state.showContacts;
            return state;
        });
    }
    render() {
        var { classes, contacts, ...all } = this.props;
        var { showContacts } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.inner}>
                    <Header {...all} onContactClick={this.onContactClick} showContacts={showContacts} />
                    {contacts.map((item, key) => <Info {...item} key={key} show={showContacts} />) }
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(Card1);