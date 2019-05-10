import React, { Component } from 'react';
import injectSheet from 'react-jss'

import ContactIconDown from 'mdi-react/ArrowDownCircleIcon';
import ContactIconUp from 'mdi-react/ArrowUpCircleIcon';
import LinkedIn from 'mdi-react/LinkedinIcon';
import GitHub from 'mdi-react/GithubFaceIcon';
import Codepen from 'mdi-react/CodepenIcon';
import Email from 'mdi-react/EmailOutlineIcon';

const styles = theme => ({
    root: {
        width: "100%",
        padding: "50px",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
    },
    inner: {
        width: 500,
        margin: "auto",
    },
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
    infocard: {
        background: theme.colorPrimaryLighter,
        height: 60,
        marginTop: -60,
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
        opacity: 0,
        transition: "opacity 0.2s linear, margin-top 0.2s linear",
        zIndex: 10,
    },
    infocardshow: {
        opacity: 1,
        marginTop: 20,
        transition: "opacity 0.1s linear, margin-top 0.2s linear",
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
    infoIcon: {
        position: "relative",
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        "& > *":{
            display: "inline-block",
            verticalAlign: "middle",
        },
        "& > span":{
            marginLeft: 10,
        }
    }
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
        var { classes, theme } = this.props;
        var { showContacts } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.inner}>
                    <div className={classes.card}>
                        <div className={classes.profilePicture}>
                            <img className={classes.picture} src="https://picsum.photos/id/565/100/100" alt="profile" />
                        </div>
                        <div className={classes.content}>
                            <span className={classes.name}>Filip Andrei Muresan</span>
                            <span className={classes.job}>Full stack developer</span>
                            <div className={classes.contact} onClick={this.onContactClick}>
                                <span>Contact me</span>
                                {showContacts 
                                    ? 
                                    <ContactIconDown className={classes.contactIcon} color={theme.colorPrimaryLighter} size={40} /> 
                                    :
                                    <ContactIconUp className={classes.contactIcon} color={theme.colorPrimaryLighter} size={40} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className={classes.infocard + " " + (showContacts ? classes.infocardshow : "")}>
                        <div className={classes.infoIcon}>
                            <LinkedIn />
                            <span><a href="https://linkedin.com/in/filip-andrei-muresan/" target="blank">Visit my profile</a></span>
                        </div>
                    </div>
                    <div className={classes.infocard + " " + (showContacts ? classes.infocardshow : "")}>
                        <div className={classes.infoIcon}>
                            <GitHub />
                            <span><a href="https://github.com/filipandry" target="blank">filipandry</a></span>
                        </div>
                    </div>
                    <div className={classes.infocard + " " + (showContacts ? classes.infocardshow : "")}>
                        <div className={classes.infoIcon}>
                            <Codepen />
                            <span><a href="https://codepen.io/filip_andry/" target="blank">@filip_andry</a></span>
                        </div>
                    </div>
                    <div className={classes.infocard + " " + (showContacts ? classes.infocardshow : "")}>
                        <div className={classes.infoIcon}>
                            <Email />
                            <span><a href="mailto:info@pilif.eu">info@pilif.eu</a></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(Card1);