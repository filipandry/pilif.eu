import React, { Component } from 'react';
import injectSheet from 'react-jss'

import ContactIconDown from 'mdi-react/ArrowDownCircleIcon';
import ContactIconUp from 'mdi-react/ArrowUpCircleIcon';

const styles = theme => ({
    card: {
        position: "relative",
        background: theme.colorPrimary,
        height: 140,
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
        "& > div":{
            display: "inline-block",
            verticalAlign: "top",
        },
        zIndex: 11,
    },  
    profilePicture: {
        width: 140,
    },
    picture:{
        borderRadius: "50%",
        margin: "20px",
    },
    content: {
        width: "calc(100% - 140px)",
    },
    name: {
        margin: "20px 0 0",
        display: "block",
        fontSize: "18px",
        fontWeight: "bold",
    },
    job: {
        display: "block",
        fontSize: "14px",
        fontStyle: "italic",
    },
    contact: {
        position: "absolute",
        left: 140,
        bottom: 20,
        width: "calc(100% - 140px)",
        // padding: "20px",
        cursor: "pointer",
        "& > *":{
            display: "inline-block",
            verticalAlign: "middle",
        }
    },
    contactIcon: {
        position: "absolute",
        right: 20,
    },
});

class Header extends Component {
    render() {
        var { classes, theme, name, title, profilePicture, showContacts, onContactClick } = this.props;
        return (
            <div className={classes.card}>
                <div className={classes.profilePicture}>
                    <img className={classes.picture} src={profilePicture} alt="profile" />
                </div>
                <div className={classes.content}>
                    <span className={classes.name}>{name}</span>
                    <span className={classes.job}>{title}</span>
                    <div className={classes.contact} onClick={onContactClick}>
                        <span>Contact me</span>
                        {showContacts 
                            ? 
                            <ContactIconDown className={classes.contactIcon} color={theme.colorPrimaryLighter} size={40} /> 
                            :
                            <ContactIconUp className={classes.contactIcon} color={theme && theme.colorPrimaryLighter} size={40} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(Header);