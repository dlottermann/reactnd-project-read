import {
  ADD_COMMENT,
  RECEIVE_POSTS_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT
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
        ...newState
      };
      case EDIT_COMMENT:
      const { author, body } = action.comment;
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          author,
          body,
        }
      };
    case VOTE_COMMENT:
      newState = Object.values(state).map(comment => {
        if (comment.id !== action.id) {
          return comment;
        }
        return {
          ...comment,
          voteScore:
            action.option === "upVote"
              ? comment.voteScore + 1
              : comment.voteScore - 1
        };
      });
      return {
        ...newState
      };
    default:
      return state;
  }
};

export default comments;
