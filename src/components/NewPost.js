import React, { Component } from "react";
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
    content: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${this.state.title}`);
    console.log(`Email: ${this.state.content}`);
  }

  render() {
    return (
      <Container className="main">
        <h3>New Post</h3>
        <Form className="form" onSubmit={e => this.submitForm(e)}>
          <Col>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="title"
                name="title"
                id="exampleEmail"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="exampleText">Post Content</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
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

export default NewPost;
