import React, { Component, Fragment } from "react";
import injectSheet from "react-jss";
import { withFirebase } from "../firebase";
import { compose } from "recompose";
import withAuthentication from "../auth/session/withAuthentications";

const styles = (theme) => ({});
const INITIAL_STATE = {
  title: "",
  text: "",
  image: "",
  group: "",
  id: "",
  error: null
};

class PortfolioEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = (event) => {
    const { title, text, image, group } = this.state;
    //this.props.firebase.getNextId('portfolio').then(id => id);
    this.props.firebase.getNextId("portfolio").then((id) => {
      this.props.firebase
        .writePortfolioData(id, title, text, image, parseInt(group))
        .then((authUser) => {
          this.setState({ ...INITIAL_STATE });
        })
        .catch((error) => {
          this.setState({ error });
        });
    });

    event.preventDefault();
  };
  onDelete = (event) => {
    const { firebase } = this.props;
    const { id } = this.state;

    firebase.db
      .ref("portfolio/" + id)
      .set(null)
      .then((res) => {
        this.setState({ ...INITIAL_STATE });
      });

    event.preventDefault();
  };
  render() {
    const { title, text, image, group, id, error } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <input
            name="title"
            value={title}
            onChange={this.onChange}
            type="text"
            placeholder="Title"
          />
          <input
            name="text"
            value={text}
            onChange={this.onChange}
            type="text"
            placeholder="Text"
          />
          <input
            name="image"
            value={image}
            onChange={this.onChange}
            type="text"
            placeholder="Image"
          />
          <input
            name="group"
            value={group}
            onChange={this.onChange}
            type="text"
            placeholder="Group"
          />

          <button type="submit">Save</button>

          {error && <p>{error.message}</p>}
        </form>
        <form onSubmit={this.onDelete}>
          <input
            name="id"
            value={id}
            onChange={this.onChange}
            type="text"
            placeholder="Id to delete"
          />

          <button type="submit">Delete</button>
        </form>
      </Fragment>
    );
  }
}

const composer = compose(injectSheet(styles), withFirebase, withAuthentication);

export default composer(PortfolioEdit);
