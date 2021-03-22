import React, { Component, Fragment } from "react";
import { compose } from "recompose";
import injectSheet from "react-jss";
import withAuthentication from "../../components/auth/session/withAuthentications";
import { withFirebase } from "../../components/firebase";
import { Link, withRouter } from "react-router-dom";
import Table from "../../components/table/Table";

const styles = (theme) => ({
  root: {
    padding: 25,
    "& > span": {
      display: "block",
      width: "100%",
      maxWidth: 400,
      "& > *": {
        display: "block",
        width: "100%"
      }
    }
  },
  action: {
    textDecoration: "none",
    color: theme.colorPrimary,
    "&:visited": {
      color: theme.colorPrimary
    },
    "&:hover": {
      color: theme.colorPrimaryLighter
    },
    cursor: "pointer",
    margin: "0 5px"
  }
});
class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        title: "",
        text: "",
        group: ""
      }
    };
  }
  componentDidMount() {
    var { firebase } = this.props;
    var { id } = this.props.match.params;
    if (id) {
      firebase.db.ref(`/portfolio/${id}`).on("value", (snapshot) => {
        var item = snapshot.val();
        this.setState({ item });
      });
    }
  }
  onChange = (key) => (ev) => {
    var value = ev.target.value;
    this.setState((state) => {
      state.item[key] = value;
      return state;
    });
  };
  onSave = () => {
    var { firebase } = this.props;
    var { item } = this.state;
    var { id } = this.props.match.params;
    item.group = parseInt(item.group);
    if (!id) {
      this.props.firebase.getNextId("portfolio").then((newId) => {
        item.id = newId;
        firebase.db
          .ref(`/portfolio/${newId}`)
          .set(item)
          .then(() => {
            this.props.history.push(`/backend/project/${newId}`);
          });
      });
    } else {
      firebase.db.ref(`/portfolio/${id}`).set(item);
    }
  };
  deleteItem = (imageid) => () => {
    var { firebase } = this.props;
    var { id } = this.props.match.params;
    firebase.db.ref(`/portfolio/${id}/images/${imageid}`).set(null);
  };
  renderImages() {
    var { classes } = this.props;
    var { item } = this.state;
    var { id } = this.props.match.params;

    var columns = [
      {
        key: "id",
        label: "ID",
        width: 100
      },
      {
        key: "image",
        label: "Image",
        width: 300
      },
      {
        key: "actions",
        label: <Link to={`/backend/project/${id}/image`}>New image</Link>,
        width: 200,
        float: "right",
        customContent: (row) => {
          return (
            <Fragment>
              <Link to={`/backend/project/${id}/image/${row.id}`}>Edit</Link>
              <span
                className={classes.action}
                onClick={this.deleteItem(row.id)}
              >
                Delete
              </span>
            </Fragment>
          );
        }
      }
    ];

    return (
      <div className={classes.images}>
        <Table columns={columns} data={item.images} />
      </div>
    );
  }
  render() {
    var { classes } = this.props;
    var { item } = this.state;
    return (
      <div className={classes.root}>
        <Link to="/backend/projects">Back</Link>
        <span>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={item.title}
            onChange={this.onChange("title")}
          />
        </span>
        <span>
          <label htmlFor="text">Text</label>
          <textarea
            type="text"
            name="text"
            id="text"
            rows={5}
            value={item.text}
            onChange={this.onChange("text")}
          />
        </span>
        <span>
          <label htmlFor="group">Group</label>
          <input
            type="text"
            name="group"
            id="group"
            value={item.group}
            onChange={this.onChange("group")}
          />
        </span>
        <span className={classes.action} onClick={this.onSave}>
          SAVE
        </span>
        {this.renderImages()}
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
export default composer(Project);
