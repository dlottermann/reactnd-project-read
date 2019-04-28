import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getInitialData } from "../actions/shared";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import PostPage  from "./PostPage";
import NewPost from "./NewPost";
import LoadingBar from 'react-redux-loading'
import NewComment from './NewComment';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Nav />
          <LoadingBar />
          <div className="container">
            {this.props.loading === true 
              ? null
              : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/posts/:category" component={Dashboard} />
                <Route path="/posts/:id" component={PostPage} />
                <Route path="/new" component={NewPost} />
                <Route path="/posts/edit/:id" component={NewPost} />
                <Route path="/comments/edit/:id" component={NewComment} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps (state) {
  const { posts, categories } = state
  return{
    loading: posts.length < 1 || categories.length < 1
  }
}

export default connect(mapStateToProps)(App);
