import React, { Component } from "react";
import Page from "components/page/Page";
import Card from "components/card/Card";
import Info from "components/info/Info";

import { withFirebase } from "components/firebase";

import injectSheet from "react-jss";
import { compose } from "recompose";

import LinkedIn from "mdi-react/LinkedinIcon";
import GitHub from "mdi-react/GithubFaceIcon";
import Codepen from "mdi-react/CodepenIcon";
import Email from "mdi-react/EmailOutlineIcon";

import PageContainer from "../components/page/PageContainer";
import withAuthentication from "../components/auth/session/withAuthentications";
import Card1 from "../components/profile/card1/Card1";

import { compareDesc } from "utils";

const styles = (theme) => ({
  "@global": {
    body: {
      overflow: "hidden"
    },
    "*": {
      boxSizing: "border-box"
    },
    a: {
      textDecoration: "none",
      color: theme.colorSecondary,
      "&:visited": {
        color: theme.colorSecondary
      }
    }
  },
  root: {
    width: "100%",
    height: "100%"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      games: [],
      websites: [],
      designs: [],
      other: []
    };
  }

  componentDidMount() {
    var { firebase } = this.props;

    firebase.db.ref("/portfolio").on("value", (snapshot) => {
      var items = Array.from(snapshot.val()).sort(compareDesc);
      firebase.db.ref("/groups").on("value", (groupSnap) => {
        var groups = Array.from(groupSnap.val()).filter((i) => i !== undefined);
        this.setState((state) => {
          groups = groups.map((item) => {
            item.items = items.filter(
              (i) => i !== undefined && i.group === item.id
            );
            return item;
          });
          state.groups = groups;
          return state;
        });
      });
    });
  }

  render() {
    var { theme, classes } = this.props;
    var { groups } = this.state;

    var cardInfos = {
      name: "Filip Andrei Muresan",
      title: "Full stack developer",
      profilePicture: "https://picsum.photos/id/565/100/100",
      contacts: [
        {
          label: "LinkedIn",
          icon: <LinkedIn />,
          link: "https://linkedin.com/in/filip-andrei-muresan/",
          text: "Visit my profile"
        },
        {
          label: "GitHub",
          icon: <GitHub />,
          link: "https://github.com/filipandry",
          text: "filipandry"
        },
        {
          label: "Codepen",
          icon: <Codepen />,
          link: "https://codepen.io/filip_andry/",
          text: "@filip_andry"
        },
        {
          label: "Email",
          icon: <Email />,
          link: "mailto:info@pilif.eu",
          text: "info@pilif.eu"
        }
      ]
    };
    var groupsToShow = groups.filter((f) => f.items.length > 0);
    return (
      <div className={classes.root}>
        <PageContainer>
          <Page color={theme && theme.colorSecondaryLighter}>
            <Card {...cardInfos} />
          </Page>
          {groupsToShow.map((item, index) => {
            return (
              <Page
                key={index}
                color={
                  index % 2 !== 1
                    ? theme.colorPrimary
                    : theme.colorSecondaryLighter
                }
              >
                <Info
                  item={item}
                  color={
                    index % 2 !== 0
                      ? theme.colorPrimary
                      : theme.colorSecondaryLighter
                  }
                  color2={
                    index % 2 !== 1
                      ? theme.colorPrimary
                      : theme.colorSecondaryLighter
                  }
                />
              </Page>
            );
          })}
          <Page
            color={theme && theme.colorSecondaryLighter}
            style={{ display: "flex" }}
          >
            <Card1 {...cardInfos} />
          </Page>
        </PageContainer>
      </div>
    );
  }
}

const composer = compose(injectSheet(styles), withFirebase, withAuthentication);
export default composer(Home);
