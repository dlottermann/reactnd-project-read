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


 isValidCategory = p =>{
   const { categories } = this.props
  
  let path = p.substr(p.lastIndexOf('/') + 1)

  let t = Object.values(categories).some(c => c.path === path )

   return p === '/' 
   ? true 
   : t
   ? t
   : false

 } 


  render() {
    const postsList = this.handleOrderPosts();
    return (
      <Fragment>
        <div className="container">
         { this.isValidCategory(window.location.pathname) && ( <span className="order">
            Order by:
            <Link
              className="order-item"
              onClick={() => this.setOrder(true)}
              to={window.location.pathname}
            >
              Time
            </Link>
            |
            <Link
              className="order-item"
              onClick={() => this.setOrder(false)}
              to={window.location.pathname}
            >
              Vote
            </Link>
          </span>) }

          {postsList.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ posts, categories }, { match }) {
  return {
    posts,
    categories,
    category: match ? match.params.category : undefined
  };
}

export default connect(mapStateToProps)(Dashboard);
