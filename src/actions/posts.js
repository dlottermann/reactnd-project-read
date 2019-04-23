import { showLoading, hideLoading } from "react-redux-loading";
import { setPost, setVotePost } from "../utils/api";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const GET_POST = "GET_POST";
export const ADD_POST = "ADD_POST";
export const VOTE_POST = "VOTE_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function singlePost(post) {
  return {
    type: GET_POST,
    post
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function votePost(id, option) {
  return {
    type: VOTE_POST,
    id,
    option
  };
}

export function editPost(id, post) {
  return {
    type: EDIT_POST,
    id,
    post
  };
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  };
}

export const handleSavePost = newPost => {
  return dispatch => {
    dispatch(showLoading());
    return setPost(newPost)
      .then(post => dispatch(addPost(post)))
      .then(() => dispatch(hideLoading()));
  };
};


export const handleSaveVote = (postId, option) => {
  return dispatch => {
    dispatch(showLoading());
    return setVotePost(postId,option)
      .then(() => dispatch(votePost(postId,option)))
      .then(() => dispatch(hideLoading()));
  }
}