import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        {this.props.posts.map(id => (
          <Post key={id} id={id} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: Object.keys(posts).sort(
      (a, b) => posts[b].timestamp - posts[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
