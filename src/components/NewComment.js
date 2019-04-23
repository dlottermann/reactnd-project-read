import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { handleSaveComment } from "../actions/comments";
import { generateUID, generateDateTime } from "../utils/func";

class NewComment extends Component {
  state = {
    author: "",
    body: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm(e) {
    e.preventDefault();

    const { author, body } = this.state;
    const { dispatch, id } = this.props;

    let newComment = {
      parentId: id,
      body,
      id: generateUID(),
      author,
      timestamp: generateDateTime()
    };

    dispatch(handleSaveComment(newComment));
    this.setState(() => ({
      author:'',
      body: ''
    }));
  }

  render() {
    return (
      <Container className="main-comment">
        <span className="title-h2">Add your comment:</span>
        <Form className="form" onSubmit={e => this.submitForm(e)}>
          <Col>
            <FormGroup>
              <Input
                placeholder="Author..."
                type="text"
                name="author"
                id="author"
                value={this.state.author}
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
                value={this.state.body}
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

function mapStateToProps(state, { id }) {
  return {
    id
  };
}

export default connect(mapStateToProps)(NewComment);
