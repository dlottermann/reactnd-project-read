import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { getInitialData } from "../actions/shared";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import LoadingBar from "react-redux-loading";
import NewComment from "./NewComment";
import PageError from "./PageError";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <Fragment>
        <Nav />
        <LoadingBar />
        <div className="container">
          {this.props.loading === true ? null : (
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/comments/edit/:id" component={NewComment} />
              <Route exact path="/new" component={NewPost} />
              <Route exact path='/:category/:id' component={PostPage} />  
              <Route exact path='/:category' component={Dashboard} />
              <Route exact path="/:category/:id/edit" component={NewPost} />
              <Route component={PageError} />
            </Switch>
          )}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ categories, posts, comments }) {
  return {
    loading: posts.length < 1 || categories.length < 1 || comments.length < 1,
    posts,
    comments,
    categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => dispatch(getInitialData())
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
