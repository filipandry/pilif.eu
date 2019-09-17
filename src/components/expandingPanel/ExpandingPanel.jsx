import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        position: 'absolute',
        background: theme.colorSecondary,
        transition: 'all 0.3s linear',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.7)',
        fontSize: 0,
        '&> div':{
            opacity: 0,
            transition: 'opacity 0.15s linear',
        }
    },
    rootBefore: {
        top: props => props.top,
        left: props => props.left,
        width: props => props.width,
        height: props => props.height,
    },
    rootAfter: {
        top: props => window.scrollY + (window.innerHeight / 2) - (props.heightEnd/2),
        left: props => window.scrollX + (window.innerWidth / 2) - (props.widthEnd/2),
        width: props => props.widthEnd,
        height: props => props.heightEnd,
        '&> div':{
            opacity: 1,
            transition: 'opacity 0.3s linear',
        }
    },
    left: {
        display: 'inline-block',
        width: '65%',
        height: '100%',
        verticalAlign: 'top',
        fontSize: 'initial',
        padding: 10,
    },
    right: {
        display: 'inline-block',
        width: '35%',
        height: '100%',
        background: theme.colorPrimaryLighter,
        verticalAlign: 'top',
        fontSize: 'initial',
        padding: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    gallery: {

    },
    mainImage:{
        width: "100%",
        paddingTop: "56.25%",
        background: theme.colorPrimary,
    },
    thumbnails:{
        fontSize:0,
        paddingTop: 10,
    },
    thumbnail:{
        width: "calc(25% - 10px)",
        margin: 5,
        display: "inline-block",
        verticalAlign: "top",
        paddingTop: "14.0625%",
        background: theme.colorPrimary,
        cursor: 'pointer',
    }
});

class ExpandigPanel extends Component {
    constructor(props){
        super(props);
        this.container = React.createRef();
        this.state = {
            start: false,
        };
    }
    componentDidMount() {
        setTimeout(() =>{
            this.setState({start: true});
        },10);

        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    doClose = () =>{
        this.setState({start: false},() =>{
            setTimeout(() => {
                this.props.onClose && this.props.onClose();
            },300);
        });
    }
    handleClickOutside = (event) =>{
        if(this.container.current && !this.container.current.contains(event.target)) {
           this.doClose();
        }
    }
    render() {
        var { classes, data } = this.props;
        var { start } = this.state;
        return ReactDOM.createPortal(
            <div ref={this.container} className={classNames(classes.root,{ [classes.rootBefore]: !start, [classes.rootAfter]: start })}>
                <div className={classes.left}>
                    <div className={classes.gallery}>
                        <div className={classes.mainImage} style={{background: `url(${data.image}) center/cover no-repeat`}}>

                        </div>
                        <div className={classes.thumbnails}>
                            <div className={classes.thumbnail} style={{background: `url(${data.image}) center/cover no-repeat`}}></div>
                            <div className={classes.thumbnail} style={{background: `url(${data.image}) center/cover no-repeat`}}></div>
                            <div className={classes.thumbnail} style={{background: `url(${data.image}) center/cover no-repeat`}}></div>
                            <div className={classes.thumbnail} style={{background: `url(${data.image}) center/cover no-repeat`}}></div>
                        </div>
                    </div>
                </div>
                <div className={classes.right}>
                    <span className={classes.title}>{data.title}</span>
                    <p>{data.text}</p>
                </div>
            </div>,
            document.body
        );
    }
}

export default injectSheet(styles)(ExpandigPanel);