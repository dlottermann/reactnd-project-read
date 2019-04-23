import { getPosts, getCategories } from "./api";

export const handleInitialData = () => {
  return Promise.all([getPosts(), getCategories()]).then(
    ([posts, categories]) => ({
      posts,
      categories
    })
  );
};


