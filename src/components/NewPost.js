import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { generateUID, generateDateTime } from "../utils/func";
import { handleSavePost } from "../actions/posts";

import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    author: "",
    category: "",
    toHome: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm(e) {
    e.preventDefault();
    const { title, author, body, category } = this.state;
    const { inEditMode, editPost, id, dispatch, categories } = this.props;

    let newPost = {
      title,
      body,
      author,
      category: category === '' ? categories[0].name : category
    };

    if (inEditMode) {
      editPost(id, newPost).then(() => this.goBack(true));
    } else {
      newPost = {
        ...newPost,
        id: generateUID(),
        timestamp: generateDateTime()
      };
      dispatch(handleSavePost(newPost))
      this.setState(() => ({
          title: "",
          body: "",
          author: "",
          toHome: id ? false : true
        }))
      
    }
  }

  render() {
    const { title, body, author, category, toHome } = this.state;

    if (toHome === true) {
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
                vale={author}
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
                vale={title}
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

export default connect(mapStateToProps)(NewPost);
