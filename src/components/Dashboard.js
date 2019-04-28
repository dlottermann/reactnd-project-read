import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  state = {
    sortBy: true
  };

  handleOrderPosts = () => {
    const { posts, category } = this.props;
    const { sortBy } = this.state;

    let postsList = Object.values(posts);

    if (category !== undefined) {
      postsList = postsList.filter(post => post.category === category);
    }

    return sortBy
      ? postsList.sort((a, b) => b.timestamp - a.timestamp)
      : postsList.sort((a, b) => b.voteScore - a.voteScore);
  };

  setOrder = order => {
    this.setState(prevState => ({
      ...prevState,
      sortBy: order
    }));
  };

  render() {
    const postsList = this.handleOrderPosts();
    console.log(window.location.pathname)
    return (
      <Fragment>
        <div className="container">
          <span className="order">
            Order by:{" "}
            <Link
              className="order-item"
              onClick={() => this.setOrder(true)}
              to={window.location.pathname}
            >
              Time
            </Link>{" "}
            |{" "}
            <Link
              className="order-item"
              onClick={() => this.setOrder(false)}
              to={window.location.pathname}
            >
              Vote
            </Link>
          </span>

          {postsList.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ posts }, { match }) {
  return {
    posts,
    category: match ? match.params.category : undefined
  };
}

export default connect(mapStateToProps)(Dashboard);
