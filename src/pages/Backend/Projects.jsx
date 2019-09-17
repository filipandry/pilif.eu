import React, {Component} from 'react';
import {compose} from 'recompose';
import injectSheet from 'react-jss'
import withAuthentication from 'components/auth/session/withAuthentications';
import { withFirebase } from 'components/firebase';
import GroupViewer from './GroupViewer';
import color from 'color';

import { Link } from "react-router-dom";

const styles = theme => ({
    root: {
        padding: 25,
    },
    headerRow:{
        padding: 10,
        width: '100%',
        background: theme.colorSecondary,
        color: theme.fontColorSecondary,
        '&> span':{
            display: 'inline-block',
            width: 150,
            overflow: 'hidden',
        }
    },
    row:{
        padding: 10,
        width: '100%',
        overflow: 'hidden',
        background: color(theme.colorPrimaryLighter).lighten(0.2).hsl().string(),
        color: theme.fontColorPrimary,
        maxHeight: 40,
        '&:nth-child(odd)':{
            background: color(theme.colorPrimaryLighter).lighten(0.25).hsl().string(),
            color: theme.fontColorPrimary,
        },
        '&:hover':{
            background: color(theme.colorPrimaryLighter).lighten(0.1).hsl().string(),
        },
        '&> span':{
            padding: '0 5px',
            display: 'inline-block',
            width: 150,
            overflow: 'hidden',
            verticalAlign: 'top',
        }
    },
    action: {
        textDecoration: 'none',
        color: theme.colorPrimary,
        '&:visited':{
            color: theme.colorPrimary,
        },
        '&:hover':{
            color: theme.colorPrimaryLighter,
        },
        cursor: 'pointer',
        margin: '0 5px',
    }
});
class Projects extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
        }
    }
    componentDidMount(){
        var {firebase} = this.props;
        
        firebase.db.ref('/portfolio').on('value',snapshot =>{
          var items = Array.from(snapshot.val()).filter(f => f!== undefined);
          this.setState({items});          
        });
        
      }
      deleteItem = (id) => (event)=>{
        var {firebase} = this.props;
        firebase.db.ref(`/portfolio/${id}`).set(null);
      }
  render() {
    var { classes } = this.props;
    var { items } = this.state;
    console.log(items);
    return (
        <div className={classes.root}>
            <div className={classes.headerRow}>
                <span>ID</span>
                <span>Title</span>
                <span>Text</span>
                <span>Group</span>
                <span>
                    <Link to={`/backend/project/`}>New project</Link>
                </span>
            </div>
            {items.map((item, index) => (
                <div key={index} className={classes.row}>
                    <span>{item.id}</span>
                    <span>{item.title}</span>
                    <span>{item.text}</span>
                    <span><GroupViewer id={item.group} /></span>
                    <span>
                        <Link to={`/backend/project/${item.id}`}>Edit</Link>
                        <span className={classes.action} onClick={this.deleteItem(item.id)}>Delete</span>
                    </span>
                </div>
            ))}
        </div>
    );
  }
}

const composer = compose(
    injectSheet(styles),
    withFirebase,
    withAuthentication
);
export default composer(Projects);