import React, { Component } from 'react';
import injectSheet from 'react-jss'
import ExpandingPanel from '../expandingPanel/ExpandingPanel';

import { withFirebase } from 'components/firebase';
import {compose} from 'recompose';

const styles = theme => ({
    root: {
        display: "inline-block",
        verticalAlign: "top",
        width: "calc(100vw - 50px)",
        maxWidth: 800,
        padding: "10px",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    inner: {
        background: theme.colorPrimaryLighter,
        color: theme.colorSecondary,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.6)',
        fontSize: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        display: 'block',
        padding: 10
    },
    image: {
        //borderTopLeftRadius: "10px",
        //borderTopRightRadius: "10px",
        width: "100%",
        height: "auto",
    },
    content: {
        fontSize: 14,
        padding: 10,
        display: 'block',
    },
    group: {
        float: 'right',
    }
});


class Feed extends Component {
    constructor(props){
        super(props);
        this.state = {
            group: undefined,
        };
    }
    componentWillMount() {

        var {firebase,item} = this.props;
        firebase.db.ref(`/groups/${item.group}`).on('value',snapshot =>{
            //console.log(snapshot.val());
            this.setState({group: snapshot.val()});
        });
    } 

    render() {
        var { classes, item } = this.props;
        var { group } = this.state;
        var image = item.images && item.images.length > 1 && item.images[1].image;
        return (
            <div className={classes.root}>
                <div ref={this.item} className={classes.inner}>
                    <div className={classes.title}>
                        <span>{item.title}</span>
                        <span className={classes.group}>{group && group.title}</span>
                    </div>
                    <img src={image} className={classes.image} alt={item.title}/>
                    <div className={classes.content}>
                        <span>{item.text}</span>
                    </div>
                </div>
            </div>
        );
    }
}


const composer = compose(
    injectSheet(styles),
    withFirebase,
  );
export default composer(Feed);