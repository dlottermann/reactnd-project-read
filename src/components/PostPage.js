import React, { Component, Fragment } from "react";
import { TiStarOutline, TiUserOutline } from "react-icons/ti";
import { connect } from "react-redux";
import Comments from './Comments';
import { withRouter } from "react-router-dom";
class PostPage extends Component {
  render() {
    const { post, id } = this.props;
    return (
      <Fragment>
        {post === undefined ? null : (
          <span>
            <div className="main-post-individual">
              <span className="author-post-individual">
                <TiUserOutline /> Author {post.author} in{" "}
                <a href="/">{post.category}</a>
              </span>

              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <div>
                <span className="points-post">
                  <TiStarOutline /> {post.voteScore} points
                </span>
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
    post,
    id
  };
}

export default withRouter(connect(mapStateToProps)(PostPage));
