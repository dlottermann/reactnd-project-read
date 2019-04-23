import { RECEIVE_CATEGORIES } from "../actions/categories";

const categories = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        ...action.categories
      };
    default:
      return state;
  }
}

export default categories