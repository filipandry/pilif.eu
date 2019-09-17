import React, { Component, Fragment } from 'react';
import {compose} from 'recompose';
import injectSheet from 'react-jss'
import withAuthentication from 'components/auth/session/withAuthentications';
import { withFirebase } from 'components/firebase';

const styles = theme => ({
    
});

class GroupViewer extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ""
        }
    }
    componentWillMount(){
        var {firebase, id} = this.props;
        firebase.db.ref(`/groups/${id}`).on('value', snapshot => {
            var group = snapshot.val();
            console.log(group);
            if(group){
                this.setState({title: group.title});
            }
        })
    }
    render() {
        var { title } = this.state;
        return (
            <Fragment>
                {title}
            </Fragment>
        );
    }
}

const composer = compose(
    injectSheet(styles),
    withFirebase,
    withAuthentication
);
export default composer(GroupViewer);