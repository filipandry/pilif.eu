import React, { Component } from 'react';
import injectSheet from 'react-jss'

const styles = theme => ({
    root: {
        position: 'relative',
    },
    adv: {
        position: 'fixed',
        top:0,
        left:0,
        width: '100vw',
        height: '100vh',
        background: 'url(https://picsum.photos/id/100/1920/1080) center/cover no-repeat fixed',

    },
    post: {
        position: 'relative',
        top: '70vh',
        width: '70%',
        margin: '0 auto 50px',
        background: theme.colorSecondary,
        borderRadius: 2,
        boxShadow: '0 0 10px rgba(0,0,0,0.6)',
        padding: 30,
        color: theme.fontColorSecondary,
    },
    title: {
        display: 'block',
        fontSize: 50,
    },
    subtitle: {
        display: 'block',
        fontSize: 18,
    },
    maintag:{
        fontSize: 12,
    },
    date:{
        fontSize: 12,
        '&:before':{
            display: 'inline',
            content:"' - '",
            position: 'relative',
        }
    },
    author: {
        fontSize: 12,
        display: 'block',
        margin: '30px 0',
    },
    content: {
        textAlign: 'justify',
    }
});

class BlogPost extends Component {
    render() {
        var { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.adv}>

                </div>
                <div className={classes.post}>
                    <div>
                        <span className={classes.maintag}>MAIN TAG</span>
                        <span className={classes.date}>SEPTEMBER 19, 2019</span>
                    </div>
                    <span className={classes.title}>Lorem ipsum dolor sit amet</span>
                    <span className={classes.subtitle}>Lorem ipsum dolor sit amet, consectetur</span>
                    <span className={classes.author}>Superman</span>
                    <div className={classes.content}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae cursus nisl. Sed nec mollis libero. Etiam aliquet lobortis libero vitae sagittis. Sed eros tortor, blandit eu augue et, maximus vulputate est. Sed eu est at nulla sollicitudin iaculis. Aenean sit amet neque leo. Suspendisse rutrum lobortis erat a consequat. Vivamus fringilla imperdiet diam, a aliquam purus rutrum malesuada. Nullam scelerisque mauris a lobortis congue. Vestibulum hendrerit aliquam luctus. Cras sed nibh neque. Curabitur enim nisl, convallis id risus et, efficitur aliquam tortor. Morbi egestas neque mauris, sit amet vestibulum odio ornare vitae.</p>
                        <p>Donec vulputate pretium urna sed tincidunt. Nam suscipit massa sodales, tincidunt dolor nec, euismod elit. Curabitur a dapibus justo. Vivamus sit amet leo ultrices, faucibus nunc nec, elementum nibh. Pellentesque lorem nunc, gravida malesuada scelerisque scelerisque, cursus eget lectus. Donec eleifend turpis sit amet ante posuere vulputate. Praesent et arcu felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer fringilla scelerisque libero sed blandit. Morbi lobortis lectus nec dui finibus volutpat non sed dolor. Praesent facilisis lorem in odio euismod, ut rutrum lorem posuere. Etiam nisl leo, gravida non neque ac, condimentum osuere turpis. Morbi porta massa justo, quis lacinia urna pulvinar vel. Duis ut blandit nulla. Vivamus ac nisl et mi consectetur molestie in nec ante.</p>
                        <p>Ut efficitur elementum dolor, non tincidunt mauris luctus a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam malesuada dolor quis blandit fermentum. Ut tempus rutrum elit eget euismod. Curabitur lacus nibh, vehicula a elit ut, malesuada ullamcorper eros. Curabitur id sem risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        <p>Vestibulum egestas dui ac ex imperdiet, ac euismod lorem porttitor. Quisque quis nunc diam. Nunc sit amet neque ut nulla ultrices malesuada. Maecenas tellus ligula, rutrum suscipit nisl nec, accumsan efficitur odio. Nam varius accumsan turpis quis pulvinar. In vel hendrerit quam. Maecenas laoreet leo ac dui aliquet tincidunt. Aenean vitae viverra nulla, eget mollis arcu. Sed laoreet non ante cursus gravida. Sed porttitor facilisis mauris ac pretium. Vivamus nibh diam, euismod in lectus vel, fringilla sodales libero. Nullam cursus eu metus vel sollicitudin.</p>
                        <p>Sed malesuada, augue eu convallis semper, dui massa fermentum magna, a malesuada magna velit sit amet augue. Maecenas sed dui laoreet, lobortis quam ut, gravida nisi. Nulla eu molestie mi. Pellentesque nisi ex, malesuada posuere sem sit amet, aliquam rhoncus quam. Sed pretium posuere felis et accumsan. Nulla auctor pretium posuere. Pellentesque porta, risus eu sagittis consectetur, sapien sem tincidunt nisi, non dictum magna orci et neque. Aliquam leo nunc, hendrerit a pulvinar eu, blandit at nulla. Praesent scelerisque felis ex, id aliquam metus vulputate non. Nulla a leo auctor, molestie leo in, iaculis magna. Praesent pharetra posuere tortor, vel pretium est. Cras eget ex finibus, fringilla neque a, tristique leo.</p>
                        <p>Ut vel dictum nisl. In iaculis urna vitae ornare sollicitudin. Suspendisse potenti. Quisque semper erat ac libero convallis, non accumsan diam volutpat. Aliquam quam nibh, hendrerit et blandit a, sodales elementum mauris. Suspendisse ut risus quis mauris sollicitudin faucibus sit amet vel ante. Maecenas ac tincidunt metus. Fusce iaculis non lacus quis tempus. Sed cursus rutrum ante sit amet blandit. In hac habitasse platea dictumst. Aliquam ut consectetur ante. Nunc suscipit massa id quam imperdiet fermentum eu id lectus. Pellentesque gravida, justo quis aliquam mattis, mauris tortor hendrerit neque, a posuere ligula arcu nec risus. Nulla ut massa mauris. Aliquam cursus nisi massa, sed eleifend dui pellentesque non.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(BlogPost);