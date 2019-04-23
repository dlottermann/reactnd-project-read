import React, { Component } from "react";
import { connect } from "react-redux";
import NewComment from "./NewComment";
import { TiMessages } from "react-icons/ti";
import { handleGettingComments, handleDeleteComment } from "../actions/comments";
import * as moment from 'moment'


class Comments extends Component {

  componentDidMount = () => {
    const { loadComments, id } = this.props;
    loadComments(id);
  }; 

  displayCommentCount = count => {
    switch (true) {
      case count === 1:
        return `1 comment`;
      case count === 0:
        return `No comments`;
      default:
        return `${count} comments`;
    }
  };

  deleteComment = (e) => {
    e.preventDefault()
    const { handleDelete } = this.props;
    handleDelete(e.target.value)
  }

  render() {
     const { postComments, id } = this.props
    return (
      <div className="container">
        <div className="comments-post-individual">
          <div className="comments-post-title">
            <TiMessages /> {this.displayCommentCount(postComments.length)}
          </div>
          {postComments === undefined 
           ? null 
           : postComments.map((comment) => (
             <div key={comment.id} className="comment-author">
              <div className="author-name">{comment.author}  commented on { moment(comment.timestamp).format('MMM Do YYYY')}</div>
              <p>{comment.body}</p>
              <div>
              <button onClick={ this.deleteComment } value={comment.id} >Edit Comment</button>
            </div>
            </div>)
          ) }
        </div>
        <NewComment id={id} />
      </div>
    );
  }
}

function mapStateToProps({ comments },{ id }) {
  const onlyForThisPost = Object.values(comments).filter(
    comment => comment.parentId === id
  );
  return {
    postComments: onlyForThisPost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadComments: id => dispatch(handleGettingComments(id)),
    handleDelete: id => dispatch(handleDeleteComment(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
