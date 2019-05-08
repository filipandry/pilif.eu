import React from 'react';
import Page from 'components/page/Page';
import Card from 'components/card/Card';
import Info from 'components/info/Info';
import Portfolio from 'components/portfolio/Portfolio';

import injectSheet from 'react-jss'
import PageContainer from 'components/page/PageContainer';

const styles = theme => ({
  "@global": {
    body: {
      overflow: "hidden",
    },
    "*": {
      boxSizing: "border-box",
    }
  },
  root: {
    width: "100%",
    height: "100%",
  }
});

function App(props) {
  var {theme,classes} = props;
  var games = [
    {
      id: 1,
      title: "Mouth catcher",
      image: "https://picsum.photos/500/300?random=1",
    },
    {
      id: 2,
      title: "Briscola",
      image: "https://picsum.photos/500/300?random=2",
    },
    {
      id: 3,
      title: "Bulineer",
      image: "https://picsum.photos/500/300?random=3",
    },
    {
      id: 4,
      title: "Fruit battle",
      image: "https://picsum.photos/500/300?random=4",
    },
    {
      id: 9,
      title: "TBD",
      image: "https://picsum.photos/500/300?random=9",
    },
    {
      id: 10,
      title: "TBD",
      image: "https://picsum.photos/500/300?random=10",
    },
    {
      id: 11,
      title: "TBD",
      image: "https://picsum.photos/500/300?random=11",
    },
    {
      id: 12,
      title: "TBD",
      image: "https://picsum.photos/500/300?random=12",
    },
  ];
  var websites = [
    {
      id: 5,
      title: "pilif.eu",
      image: "https://picsum.photos/500/300?random=5",
    },
    {
      id: 6,
      title: "pisilapisigratuit.eu",
      image: "https://picsum.photos/500/300?random=6",
    },
  ];
  var designs = [
    {
      id: 7,
      title: "Pilif logo",
      image: "https://picsum.photos/500/300?random=7",
    },
  ];
  var other = [];
  var infos = [
    {
      id: 1,
      title: "Games",
      content: <Portfolio items={games} />,
    },
    {
      id: 2,
      title: "Websites",
      content: <Portfolio items={websites} />,
    },
    {
      id: 3,
      title: "Designs",
      content: <Portfolio items={designs} />,
    },
    {
      id: 4,
      title: "Other",
      content: <Portfolio items={other} />,
    },
  ];
  return (
      <div className={classes.root}>
        <PageContainer>
          <Page color={theme.colorSecondaryLighter}>
            <Card name="title" linkedin="linkedin" email="mail@mail.com" website="example.com" job="subtitle"/>
          </Page>
          <Page color={theme.colorPrimary}>
            <Info data={infos}/>
          </Page>
          <Page color={theme.colorSecondaryLighter}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Page>
          <Page color={theme.colorPrimary}>

          </Page>
          <Page color={theme.colorSecondaryLighter}>

          </Page>
        </PageContainer>
      </div>
  );
}

export default injectSheet(styles)(App);
