import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";

class NewComment extends Component {
  state = {
    comment: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${this.state.comment}`);
  }

  render() {
    return (
      <Container className='main-comment'>
        <span className='title-h2' >Add your comment:</span>
        <Form className="form" onSubmit={e => this.submitForm(e)}>
          <Col>
            <FormGroup>
              <Input
                placeholder='Comment...'
                type="textarea"
                name="comment"
                id="comment"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button size='sm'  outline color="info">Save Comment</Button>
            </Col>
         
        </Form>
      </Container>
    );
  }
}

export default NewComment;
