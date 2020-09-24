import React, { Component } from "react";
import injectSheet from "react-jss";
import classNames from "classnames";

const styles = (theme) => ({
  item: {
    position: "absolute",
    display: "block",
    verticalAlign: "top",
    width: "100%",
    margin: "auto",
    perspective: (props) => props.width,
    top: "3.7vh"
  },
  box: {
    position: "relative",
    width: "100%",
    height: 60,
    marginLeft: "auto",
    marginRight: "auto",
    color: (props) => props.color,
    textAlign: "center"
  },
  title: {
    position: "absolute",
    width: "fit-content",
    fontSize: 60,
    fontWeight: "bold",
    textTransform: "uppercase",
    left: "50%",
    transform: "translateX(-50%)",
    userSelect: "none"
  },
  title1: {
    color: (props) => props.color
  },
  title2: {
    color: (props) => props.color
  }
});

class Item extends Component {
  constructor(props) {
    super(props);
    this.Container = React.createRef();
  }
  state = {
    width: 0
  };
  render() {
    var { classes, data, onClick, isSelected } = this.props;
    var itemClasses = classes.item;
    var boxClasses = classes.box;
    if (isSelected) {
      boxClasses += " " + classes.boxSelected;
    }
    return (
      <div className={itemClasses}>
        <div className={boxClasses} onClick={onClick}>
          <span className={classNames(classes.title, classes.title1)}>
            {data.title}
          </span>
          {/* <span className={classNames(classes.title,classes.title2)}>{data.title}</span> */}
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Item);
