import React, { Component } from 'react';
import injectSheet from 'react-jss'
import PortfolioItem from 'components/portfolio/PortfolioItem';

const styles = theme => ({
    root: {
    },
});


class Portfolio extends Component {
    render() {
        var {classes, items} = this.props;

        var content =items.map((item) => {
            return (<PortfolioItem key={item.id} item={item} />)
        });
        if(!items || items.length === 0){
            content = <p>There is no content yer</p>;
        }

        return (
            <div className={classes.root}>
                {content}
            </div>
        );
    }
}


export default injectSheet(styles)(Portfolio);