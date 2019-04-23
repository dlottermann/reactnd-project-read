import { receiveCategories } from "../actions/categories";
import { receivePosts } from "../actions/posts";
import { handleInitialData } from "../utils/handlers";
import { showLoading, hideLoading } from "react-redux-loading";

export const getInitialData = () => {
  return dispatch => {
    dispatch(showLoading());
    return handleInitialData().then(({ posts, categories }) => {
      dispatch(receivePosts(posts));
      dispatch(receiveCategories(categories));
      dispatch(hideLoading());
    });
  };
};
