import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TiStarOutline,
  TiUserOutline,
  TiMessages,
  TiThumbsDown,
  TiThumbsUp,
  TiPen
} from "react-icons/ti";
import { Link, withRouter } from "react-router-dom";
import { handleSaveVote } from "../actions/posts";

class Post extends Component {
  
  handleSaveVote = (e, option) => {
    const { saveVote, post } = this.props;
    e.preventDefault();
    saveVote(post.id, option);
  }

  render() {
    const { post } = this.props;


    if (post === null) {
      return <p>This Post doesn't exist</p>;
    }

    const { author, body, category, commentCount, id, title, voteScore } = post;

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
      <div className="main-post">
       <div className="points-post">
          <TiStarOutline /> {voteScore} points
        </div>
        <div className="vote-post">
        <TiThumbsUp
          style={pointerUp}
          onClick={e => this.handleSaveVote(e, "upVote")}
        />
        <TiThumbsDown
          style={pointerDown}
          onClick={e => this.handleSaveVote(e, "downVote")}
        />
      </div>
        <Link to={`/post/${id}`}>
          <h2>{title}</h2>
          <p>
            {`${body.substring(0, 100)}`}
            <br />
            <span className="read-more">...read more</span>
          </p>
        </Link>
        <div>
          <span className="author-post">
            <TiUserOutline />{` Posted by ${author} in `}<Link to={`/posts/${category}`}>{category}</Link>
            <Link className="edit-post" to={`/edit/${id}`}>
              Edit <TiPen />
            </Link>
          </span>
          <span className="comments-post">
            {commentCount} Comments <TiMessages />
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, { post }) {
  return {
    post
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveVote: (id, option) => dispatch(handleSaveVote(id, option))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
