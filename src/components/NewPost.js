import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { generateUID, generateDateTime } from "../utils/func";
import {
  handleSavePost,
  handleEditPost,
  handleDeletePost
} from "../actions/posts";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { getPost } from "../utils/api";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    author: "",
    category: "",
    toHome: false
  };

  updateState = post => {
    this.setState(prevState => ({
      ...prevState,
      title: post.title,
      author: post.author,
      body: post.body,
      category: post.category
    }));
  };

  componentDidMount = () => {
    const { inEditMode, id, handleGetPost } = this.props;

    if (inEditMode) {
      handleGetPost(id).then(post => this.updateState(post));
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm(e) {
    e.preventDefault();
    const { title, author, body, category } = this.state;
    const {
      inEditMode,
      handleEditPost,
      id,
      categories,
      handleSavePost
    } = this.props;

    let newPost = {
      title,
      body,
      author,
      category: category === "" ? categories[0].name : category
    };

    if (inEditMode) {
      handleEditPost(id, newPost).then(
        this.setState(prevState => ({
          ...prevState,
          toHome: true
        }))
      );
    } else {
      newPost = {
        ...newPost,
        id: generateUID(),
        timestamp: generateDateTime()
      };
      handleSavePost(newPost);
      this.setState(() => ({
        title: "",
        body: "",
        author: "",
        toHome: id ? false : true
      }));
    }
  }

  handleDelete = e => {
    const { handleDeletePost, id } = this.props;
    e.preventDefault();
    handleDeletePost(id).then(
      this.setState(prevState => ({
        ...prevState,
        toHome: true
      }))
    );
  };

  render() {
    const { title, body, author, category, toHome } = this.state;
    const { inEditMode } = this.props;

    if (toHome) {
      return <Redirect to="/" />;
    }

    return (
      <Container className="main">
        <h4>Post</h4>
        <Form className="form" onSubmit={e => this.submitForm(e)}>
          <Col>
            <FormGroup>
              <Label>Author</Label>
              <Input
                type="text"
                name="author"
                id="autor"
                value={author}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Category</Label>
              <Input
                type="select"
                value={category}
                onChange={this.handleChange}
                name="category"
                id="category"
              >
                <option>react</option>
                <option>redux</option>
                <option>udacity</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="exampleText">Post Content</Label>
              <Input
                type="textarea"
                name="body"
                id="body"
                value={body}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Button className="button">Save</Button>
        </Form>
        {inEditMode && (
          <Button onClick={e => this.handleDelete(e)} className="button-delete">
            Delete
          </Button>
        )}
      </Container>
    );
  }
}

function mapStateToProps({ categories }, { match }) {
  return {
    inEditMode: match.path.includes("edit"),
    id: match.params.id,
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleGetPost: id => getPost(id),
    handleSavePost: newPost => dispatch(handleSavePost(newPost)),
    handleEditPost: (id, post) => dispatch(handleEditPost(id, post)),
    handleDeletePost: id => dispatch(handleDeletePost(id))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewPost)
);
