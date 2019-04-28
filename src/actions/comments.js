import { showLoading, hideLoading } from "react-redux-loading";
import { setComment, getComments, deleteComment, setVoteComment, updateComment } from "../utils/api";

export const RECEIVE_POSTS_COMMENT = 'RECEIVE_POSTS_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'


export function getCommentsForPost(comments) {
  return {
    type: RECEIVE_POSTS_COMMENT,
    comments,
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function voteComment(id, option) {
  return {
    type: VOTE_COMMENT,
    id,
    option,
  }
}

export function editComment(id, comment) {
  return {
    type: EDIT_COMMENT,
    id,
    comment
  }
}

export function delComment(id) {
  return {
    type: DELETE_COMMENT,
    id,
  }
}

export const handleGettingComments = (postId) => {
  return dispatch => {
    dispatch(showLoading());
    return getComments(postId).then(( comments ) => {
      dispatch(getCommentsForPost(comments))
      dispatch(hideLoading());
    });
  }
}

export const handleSaveComment = newComment => {
  return dispatch => {
    dispatch(showLoading());
    return setComment(newComment)
      .then(comment => dispatch(addComment(comment)))
      .then(() => dispatch(hideLoading()));
  };
};

export const handleDeleteComment = commentId => {
  return dispatch => {
    dispatch(showLoading());
    return deleteComment(commentId)
      .then(comment => dispatch(delComment(comment.id)))
      .then(() => dispatch(hideLoading()));
  };
}

export const handleEditComment = (commentId, comment) => {
  return dispatch => {
    dispatch(showLoading());
    return updateComment(commentId, comment)
      .then(comment => dispatch(editComment(commentId, comment)))
      .then(() => dispatch(hideLoading()));
  };
};


export const handleSaveVoteComment = (commentId, option) => {
  return dispatch => {
    dispatch(showLoading());
    return setVoteComment(commentId,option)
      .then(() => dispatch(voteComment(commentId,option)))
      .then(() => dispatch(hideLoading()));
  }
}