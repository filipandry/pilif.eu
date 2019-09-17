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
});
class Project extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: {
                title:'',
                text:'',
                image:'',
                group:'',
            },
        }
    }
    componentDidMount(){
        var {firebase} = this.props;
        var {id} = this.props.match.params;
        if(id){
            firebase.db.ref(`/portfolio/${id}`).on('value',snapshot =>{
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
          var {id} = this.props.match.params;
          item.group = parseInt(item.group);
          if(!id){
            this.props.firebase.getNextId('portfolio').then(newId => {
                item.id = newId;
                firebase.db.ref(`/portfolio/${newId}`).set(item);
            });
          }
          else {
            firebase.db.ref(`/portfolio/${id}`).set(item);
        }
      }
  render() {
    var { classes } = this.props;
    var { item } = this.state;
    return (
        <div className={classes.root}>
            <Link to="/backend/projects">Back</Link>
            <span>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={item.title} onChange={this.onChange("title")} />
            </span>
            <span>
                <label htmlFor="text">Text</label>
                <textarea type="text" name="text" id="text" rows={5} value={item.text}  onChange={this.onChange("text")}  />
            </span>
            <span>
                <label htmlFor="image">Image</label>
                <input type="text" name="image" id="image" value={item.image}  onChange={this.onChange("image")}  />
            </span>
            <span>
                <label htmlFor="group">Group</label>
                <input type="text" name="group" id="group" value={item.group}  onChange={this.onChange("group")}  />
            </span>
            <span onClick={this.onSave}>SAVE</span>
        
        </div>
    );
  }
}

const composer = compose(
    injectSheet(styles),
    withFirebase,
    withAuthentication
);
export default composer(Project);