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
import Card1 from './components/profile/card1/Card1';


const styles = theme => ({
  "@global": {
    body: {
      overflow: "hidden",
    },
    "*": {
      boxSizing: "border-box",
    },
    a: {
      textDecoration: "none",
      color: theme.colorSecondary,
      "&:visited":{
        color: theme.colorSecondary,
      }
    },
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
    var { groups} = this.state;
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
            <Page color={theme.colorSecondaryLighter} style={{display:"flex"}}>
              <Card1 />
            </Page>
            <Page color={theme.colorPrimary}>
              {!user && <Login />}
              {!user && <Register />}
              {user && <SignOut/>}
              {user && <PortfolioEdit />}
            </Page>
            <Page color={theme.colorSecondaryLighter}>
            </Page>
          </PageContainer>
        </div>
    );
  }
}

const composer = compose(
  injectSheet(styles),
  withFirebase,
  withAuthentication
);
export default composer(App);