import React, {Component} from 'react';
import Page from 'components/page/Page';
import Card from 'components/card/Card';
import Info from 'components/info/Info';
import Portfolio from 'components/portfolio/Portfolio';
import Register from 'components/auth/Register';

import { FirebaseContext, withFirebase } from 'components/firebase';

import injectSheet from 'react-jss';
import {compose} from 'recompose';

import PageContainer from 'components/page/PageContainer';
import Login from 'components/auth/Login';
import withAuthentication from './components/auth/session/withAuthentications';
import SignOut from './components/auth/SignOut';
import PortfolioEdit from './components/portfolio/PortfolioEdit';


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

class App extends Component {
  state = {
    groups: [],
    games:[],
    websites:[],
    designs:[],
    other:[],
  }

  componentDidMount(){
    var {firebase} = this.props;
    
    firebase.db.ref('/portfolio').on('value',snapshot =>{
      console.log(snapshot.val());
      firebase.db.ref('/groups').on('value', groupSnap =>{
        var groups = Array.from(groupSnap.val()).filter(i => i!== undefined);
        console.log(groups);
        this.setState(state =>{
          for(var key in groups){
            groups[key].items = Array.from(snapshot.val()).filter(i => i !== undefined && i.group===groups[key].id);
          }
          // state.games = Array.from(snapshot.val()).filter(i => i !== undefined && i.group===1);
          // state.websites = Array.from(snapshot.val()).filter(i => i !== undefined && i.group===2);
          // state.designs = Array.from(snapshot.val()).filter(i => i !== undefined && i.group===3);
          // state.other = Array.from(snapshot.val()).filter(i => i !== undefined && i.group===4);
          state.groups = groups;
          return state;
        });
      });
      
    });
  }

  render() {
    var {theme,classes, user } = this.props;
    var { groups, games, websites,designs, other} = this.state;
    // var games = [
    //   {
    //     id: 1,
    //     title: "Mouth catcher",
    //     image: "https://picsum.photos/500/300?random=1",
    //   },
    //   {
    //     id: 2,
    //     title: "Briscola",
    //     image: "https://picsum.photos/500/300?random=2",
    //   },
    //   {
    //     id: 3,
    //     title: "Bulineer",
    //     image: "https://picsum.photos/500/300?random=3",
    //   },
    //   {
    //     id: 4,
    //     title: "Fruit battle",
    //     image: "https://picsum.photos/500/300?random=4",
    //   },
    //   {
    //     id: 9,
    //     title: "TBD",
    //     image: "https://picsum.photos/500/300?random=9",
    //   },
    //   {
    //     id: 10,
    //     title: "TBD",
    //     image: "https://picsum.photos/500/300?random=10",
    //   },
    //   {
    //     id: 11,
    //     title: "TBD",
    //     image: "https://picsum.photos/500/300?random=11",
    //   },
    //   {
    //     id: 12,
    //     title: "TBD",
    //     image: "https://picsum.photos/500/300?random=12",
    //   },
    // ];
    // var websites = [
    //   {
    //     id: 5,
    //     title: "pilif.eu",
    //     image: "https://picsum.photos/500/300?random=5",
    //   },
    //   {
    //     id: 6,
    //     title: "pisilapisigratuit.eu",
    //     image: "https://picsum.photos/500/300?random=6",
    //   },
    // ];
    // var designs = [
    //   {
    //     id: 7,
    //     title: "Pilif logo",
    //     image: "https://picsum.photos/500/300?random=7",
    //   },
    // ];
    // var other = [];
    // var infos = [
    //   {
    //     id: 1,
    //     title: "Games",
    //     content: <Portfolio items={games} />,
    //   },
    //   {
    //     id: 2,
    //     title: "Websites",
    //     content: <Portfolio items={websites} />,
    //   },
    //   {
    //     id: 3,
    //     title: "Designs",
    //     content: <Portfolio items={designs} />,
    //   },
    //   {
    //     id: 4,
    //     title: "Other",
    //     content: <Portfolio items={other} />,
    //   },
    // ];
    var infos = groups.map(item => ({
      id: item.id,
      title: item.title,
      content: <Portfolio items={item.items} />
    }));
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
            </Page>
            <Page color={theme.colorPrimary}>
              {!user && <Login />}
              {!user && <Register />}
              {user && <SignOut/>}
            </Page>
            <Page color={theme.colorSecondaryLighter}>
              <PortfolioEdit />
            </Page>
          </PageContainer>
        </div>
    );
  }
}

//export default injectSheet(styles)(withFirebase(withAuthentication(App)));
const composer = compose(
  injectSheet(styles),
  withFirebase,
  withAuthentication
);
export default composer(App);