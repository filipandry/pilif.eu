import React, {Component, Fragment} from 'react';
import {compose} from 'recompose';
import injectSheet from 'react-jss'
import withAuthentication from 'components/auth/session/withAuthentications';
import { withFirebase } from 'components/firebase';
import GroupViewer from './GroupViewer';

import { Link } from "react-router-dom";
import Table from '../../components/table/Table';

const styles = theme => ({
    root: {
        padding: 25,
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
    var columns = [
        {
            key:'id',
            label:'ID',
            width: 100,
        },
        {
            key:'title',
            label:'Title',
            width: 200,
        },
        {
            key:'text',
            label:'Text',
            width: 400,
        },
        {
            key:'group',
            label:'Group',
            width: 100,
            customContent: (row) => (<GroupViewer id={row.group} />)
        },
        {
            key:'actions',
            label:<Link to={`/backend/project/`}>New project</Link>,
            width: 200,
            float: 'right',
            customContent: (row) => {
                return (
                    <Fragment>
                        <Link to={`/backend/project/${row.id}`}>Edit</Link>
                        <span className={classes.action} onClick={this.deleteItem(row.id)}>Delete</span>
                    </Fragment>
                );
            }
        },
    ];
    return (
        <div className={classes.root}>
            <Table columns={columns} data={items} />
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