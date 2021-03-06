import React, { Component, Fragment } from "react";
import {
  TiStarOutline,
  TiUserOutline,
  TiPen,
  TiThumbsUp,
  TiThumbsDown,
  TiTrash
} from "react-icons/ti";
import { connect } from "react-redux";
import Comments from "./Comments";
import { Link, withRouter } from "react-router-dom";
import { handleSaveVote, handleDeletePost } from "../actions/posts";
import PageError from './PageError';

class PostPage extends Component {

  handleSaveVote = (e, option) => {
    const { saveVote, post } = this.props;
    e.preventDefault();
    saveVote(post.id, option);
  }

  render() {
    const { post, id, handleDeletePost, loading } = this.props;

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
      <Fragment>
      { post === undefined && !loading ? <PageError /> : (
          <span>
            <div className="main-post-individual">
              <span className="author-post-individual">
                <TiUserOutline />{` Author ${post.author} in `} 
                <Link to={`/${post.category}`}>{post.category}</Link>
                <Link className="edit-post" to={`/${post.category}/${id}/edit`}>
                  Edit <TiPen />
                </Link>
                <Link className="delete-post" to={window.location.pathname} onClick={ () => handleDeletePost(id) } >
                      Delete <TiTrash />
                    </Link>
              </span>
              
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <div>
                <span className="points-post">
                  <TiStarOutline /> {post.voteScore} points
                </span>

                <TiThumbsUp
                  style={pointerUp}
                  onClick={e => this.handleSaveVote(e, "upVote")}
                />
                <TiThumbsDown
                  style={pointerDown}
                  onClick={e => this.handleSaveVote(e, "downVote")}
                />
              </div>
            </div>
            <Comments total={post.commentCount} id={id} />
          </span>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ posts }, { match }) {
  const id = match.params.id;
  const post = Object.values(posts).filter(post => post.id === id)[0];
  return {
    loading: post,
    post,
    id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveVote: (id, option) => dispatch(handleSaveVote(id, option)),
    handleDeletePost: id => dispatch(handleDeletePost(id))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostPage)
);
