import React, {Component } from 'react';
import {compose} from 'recompose';
import injectSheet from 'react-jss'
import withAuthentication from 'components/auth/session/withAuthentications';
import { withFirebase } from 'components/firebase';
import { Link, withRouter } from "react-router-dom";


const styles = theme => ({
    root: {
        padding: 25,
        '& > span':{
            display: 'block',
            width: '100%',
            maxWidth: 400,
            '& > *':{
                display: 'block',
                width: '100%',
            },
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
class ProjectImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: {
                image:'',
            },
        }
    }
    componentDidMount(){
        var {firebase} = this.props;
        var {id, imageid} = this.props.match.params;
        if(imageid){
            firebase.db.ref(`/portfolio/${id}/images/${imageid}`).on('value',snapshot =>{
            var item = snapshot.val();
            this.setState({item});          
            });
        }
    }
    onChange = (key) => (ev) => {
        var value = ev.target.value;
        this.setState(state => {
            state.item[key] = value;
            return state;
        })
    }
    onSave = () => {
        var { firebase } = this.props;
        var {item } = this.state;
        var {id,imageid} = this.props.match.params;
        item.portfolio = parseInt(id);
        if(!imageid){
            this.props.firebase.getNextId(`/portfolio/${id}/images`).then(newId => {
                item.id = newId;
                firebase.db.ref(`/portfolio/${id}/images/${newId}`).set(item).then(() =>{
                    this.props.history.push(`/backend/project/${id}/image/${newId}`);
                });
            });
        }
        else {
            firebase.db.ref(`/portfolio/${id}/images/${imageid}`).set(item).then(() =>{
            });
            
        }
    }
   
    render() {
        var { classes } = this.props;
        var { item } = this.state;
        var { id } = this.props.match.params;
        return (
            <div className={classes.root}>
                <Link to={`/backend/project/${id}`}>Back</Link>
                <span>
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" id="image" value={item.image} onChange={this.onChange("image")} />
                </span>
                <span className={classes.action} onClick={this.onSave}>SAVE</span>
            </div>
        );
    }
}

const composer = compose(
    withRouter,
    injectSheet(styles),
    withFirebase,
    withAuthentication
);
export default composer(ProjectImage);