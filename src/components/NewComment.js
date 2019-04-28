import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  handleSaveComment,
  handleEditComment
} from "../actions/comments";
import { generateUID, generateDateTime } from "../utils/func";
import { getComment } from "../utils/api";
import { Redirect, withRouter } from "react-router-dom";

class NewComment extends Component {
  state = {
    author: "",
    body: "",
    parentId: null,
    toPrevious: false
  };

  updateState = comment => {
    this.setState(prevState => ({
      ...prevState,
      author: comment.author,
      body: comment.body,
      parentId: comment.parentId
    }));
  };

  componentDidMount = () => {
    const { inEditMode, id, handleGetComment } = this.props;

    if (inEditMode) {
      handleGetComment(id).then(comment => this.updateState(comment));
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm(e) {
    e.preventDefault();

    const { author, body } = this.state;
    const { id, inEditMode, handleSaveComment, handleEditComment } = this.props;

    let newComment = {
      body,
      author
    };
    if (inEditMode) {
      handleEditComment(id, newComment).then(
        this.setState(() => ({
          author: "",
          body: "",
          toPrevious: true
        }))
      );
    } else {
      newComment = {
        ...newComment,
        parentId: id,
        id: generateUID(),
        timestamp: generateDateTime()
      };
      handleSaveComment(newComment).then(
        this.setState(() => ({
          author: "",
          body: ""
        }))
      );
    }
  }

  render() {
    const { author, body, parentId, toPrevious } = this.state;
    const { inEditMode } = this.props;

    if (toPrevious) {
      return <Redirect to={`/posts/${parentId}`} />;
    }

    return (
      <Container className="main-comment">
        <span className="title-h2">
          {inEditMode ? `Edit your comment` : `Add your comment:`}{" "}
        </span>
        <Form className="form" onSubmit={e => this.submitForm(e)}>
          <Col>
            <FormGroup>
              <Input
                placeholder="Author..."
                type="text"
                name="author"
                id="author"
                value={author}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Input
                placeholder="Comment..."
                type="textarea"
                name="body"
                id="body"
                value={body}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button size="sm" outline color="info">
              Save Comment
            </Button>
          </Col>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state, { id, match }) {
  return {
    inEditMode: match ? match.path.includes("edit") : false,
    id: match ? match.params.id : id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleGetComment: id => getComment(id),
    handleSaveComment: newComment => dispatch(handleSaveComment(newComment)),
    handleEditComment: (id, comment) => dispatch(handleEditComment(id, comment))
    /* handleDeletePost: id => dispatch(handleDeletePost(id)) */
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewComment)
);
