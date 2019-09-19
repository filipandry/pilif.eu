import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import Pagination from '../pagination/Pagination';

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
        //paddingTop: "56.25%",
        background: theme.colorPrimary,
        height: props => props.heightEnd * 0.7
    },
    thumbnails:{
        fontSize:0,
        paddingTop: 10,
        height: props => props.heightEnd * 0.3
    },
    thumbnail:{
        width: "calc(25% - 10px)",
        margin: 5,
        display: "inline-block",
        verticalAlign: "top",
        paddingTop: "14.0625%",
        background: theme.colorPrimary,
        cursor: 'pointer',
    },
    thumbailActive:{
        border: `2px solid ${theme.colorPrimary}`,
        paddingTop: 'calc(14.0625% - 4px)'
    }
});

class ExpandigPanel extends Component {
    constructor(props){
        super(props);
        this.container = React.createRef();
        this.state = {
            start: false,
            imageid: false,
            thumbnailsPage: 1,
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
    thumbnailClick = (id) => ()  =>{
        this.setState({imageid:id});
    }
    thumbnailsPageChange = (page) =>{
        this.setState({thumbnailsPage: page});
    }
    render() {
        var { classes, data } = this.props;
        var { start,imageid,thumbnailsPage } = this.state;

        var mainImage = false;
        
        var allImages = data.images.filter(f => f!== undefined);
        if(imageid){
            mainImage = data.images[imageid].image;
        }
        else {
            if(data.images && data.images.length > 0){
                mainImage = allImages[0].image;
                imageid = allImages[0].id;
            }
        }
        var startT = (thumbnailsPage-1)*4;
        var endT = startT + 4;
        var images = !!data.images ? allImages.slice(startT,endT) : [];

        console.log(allImages);

        return ReactDOM.createPortal(
            <div ref={this.container} className={classNames(classes.root,{ [classes.rootBefore]: !start, [classes.rootAfter]: start })}>
                <div className={classes.left}>
                    <div className={classes.gallery}>
                        <div className={classes.mainImage} style={{background: `url(${mainImage}) center/cover no-repeat`}}>

                        </div>
                        <div className={classes.thumbnails}>
                            {images.map((img,index) => (<div className={classNames(classes.thumbnail,{[classes.thumbailActive]: img.id === imageid })} style={{background: `url(${img.image}) center/cover no-repeat`}} onClick={this.thumbnailClick(img.id)}></div>))}
                            {allImages.length > 4 && <Pagination count={Math.ceil(allImages.length / 4)} page={thumbnailsPage} onPageChange={this.thumbnailsPageChange}/>}
                            
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