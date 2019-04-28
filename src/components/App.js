import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
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

    const { posts } = this.props

    return (
      <Fragment>
        <Nav />
        <LoadingBar />
        <div className="container">
          {this.props.loading === true ? null : (
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path='/posts/:category' component={Dashboard} />
              <Route path="/comments/edit/:id" component={NewComment} />
              <Route path="/new" component={NewPost} />

              <Route path='/post/:id' render={
                  ({match}) => {
                    const post = Object.values(posts).find( post => post.id === match.params.id )
                    return !post ? <Redirect to='/404'/> : <PostPage/> 
                  }                
              } />              
              <Route exact path="/edit/:id" component={NewPost} />
             

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
