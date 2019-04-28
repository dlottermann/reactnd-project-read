import {
  RECEIVE_POSTS,
  GET_POST,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST
} from "../actions/posts";

const posts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts
      };
    case ADD_POST:
      return {
        ...state,
        [action.post.id]: action.post
      };
    case GET_POST:
      return {
        ...state,
        [action.post.id]: action.post
      };
    case VOTE_POST:
      let newState = Object.values(state).map(post => {
        if (post.id !== action.id) {
          return post;
        }
        return {
          ...post,
          voteScore:
            action.option === "upVote" ? post.voteScore + 1 : post.voteScore - 1
        };
      });
      return {
        ...newState
      };
    case EDIT_POST:
      const { author, title, body, category } = action.post;
      newState = Object.values(state).map(post => {
        if (post.id !== action.id) {
          return post;
        }
        return {
          ...post,
          author,
          title,
          body,
          category
        };
      });
      return {
        ...newState
      };

    case DELETE_POST:
      newState = Object.values(state).filter(c => c.id !== action.id);
      return {
        ...newState
      };
    default:
      return state;
  }
};

export default posts;
