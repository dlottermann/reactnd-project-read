import {
  ADD_COMMENT,
  RECEIVE_POSTS_COMMENT,
  DELETE_COMMENT
} from "../actions/comments";

const comments = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS_COMMENT:
      return {
        ...state,
        ...action.comments
      };
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    case DELETE_COMMENT:
      let newState = Object.values(state).filter(c => c.id !== action.id); 
      return {
        ...newState,
      };
    default:
      return state;
  }
};

export default comments;
