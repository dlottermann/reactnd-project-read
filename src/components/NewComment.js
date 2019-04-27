import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  handleSaveComment,
  handleEditComment,
  handleDeletePost
} from "../actions/comments";
import { generateUID, generateDateTime } from "../utils/func";
import { getComment } from "../utils/api";


class NewComment extends Component {
  state = {
    author: "",
    body: ""
  };

  updateState = comment => {
    this.setState(prevState => ({
      ...prevState,
      author: comment.author,
      body: comment.body
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
      parentId: id,
      body,
      author,
    };

    if(inEditMode){
      console.log(id)
      handleEditComment(id,newComment);

    }else{

      newComment= {
        ...newComment,
        id: generateUID(),
        timestamp: generateDateTime()
      }
      handleSaveComment(newComment);
    }


   
    this.setState(() => ({
      author: "",
      body: ""
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
    handleEditComment: (id, comment) => dispatch(handleEditComment(id, comment)),
   /* handleDeletePost: id => dispatch(handleDeletePost(id)) */
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment);
