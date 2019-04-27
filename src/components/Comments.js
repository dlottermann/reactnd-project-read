import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NewComment from "./NewComment";
import {
  handleGettingComments,
  handleDeleteComment,
  handleSaveVoteComment
} from "../actions/comments";
import * as moment from "moment";
import {
  TiStarOutline,
  TiMessages,
  TiThumbsDown,
  TiThumbsUp,
  TiPen,
  TiUserOutline
} from "react-icons/ti";

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

  deleteComment = e => {
    e.preventDefault();
    const { handleDelete } = this.props;
    handleDelete(e.target.value);
  };

  handleSaveVote = (commentId, option) => {
    const { saveVote } = this.props;
    saveVote(commentId, option);
  };

  render() {
    const { postComments, id } = this.props;

    const pointerUp = {
      cursor: "pointer",
      color: "blue",
      fontSize: "1.5rem",
      marginRight: "4px",
      marginTop: "0.5rem"
    };

    const pointerDown = {
      cursor: "pointer",
      color: "red",
      fontSize: "1.5rem",
      marginLeft: "2px",
      marginTop: "0.5rem"
    };

    return (
      <div className="container">
        <div className="comments-post-individual">
          <div className="comments-post-title">
            <TiMessages /> {this.displayCommentCount(postComments.length)}
          </div>
          {postComments === undefined
            ? null
            : postComments.map(comment => (
                <div key={comment.id} className="comment-author">
                  <div className="points-comment">
                    <TiStarOutline /> {comment.voteScore} points
                  </div>
                  <div className="vote-comment">
                    <TiThumbsUp
                      style={pointerUp}
                      onClick={() => this.handleSaveVote(comment.id, "upVote")}
                    />
                    <TiThumbsDown
                      style={pointerDown}
                      onClick={() =>
                        this.handleSaveVote(comment.id, "downVote")
                      }
                    />
                  </div>

                  <div className="author-name">
                    <TiUserOutline /> {comment.author} commented on{" "}
                    {moment(comment.timestamp).format("MMM Do YYYY")}
                    <Link className="edit-post" to={`/comments/edit/${comment.id}`}>
                      Edit <TiPen />
                    </Link>
                  </div>

                  <p>{comment.body}</p>
                  <div>
                    <button onClick={this.deleteComment} value={comment.id}>
                      Delete Comment
                    </button>
                  </div>
                </div>
              ))}
        </div>
        <NewComment id={id} />
      </div>
    );
  }
}

function mapStateToProps({ comments }, { id }) {
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
    handleDelete: id => dispatch(handleDeleteComment(id)),
    saveVote: (id, option) => dispatch(handleSaveVoteComment(id, option))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
