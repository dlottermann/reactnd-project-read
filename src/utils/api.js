const api = "http://localhost:3001";

// Generate a unique token
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPostsCategorie = categorie =>
  fetch(`${api}/${categorie}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPost = post =>
  fetch(`${api}/posts/${post}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const setPost = post =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

export const setVotePost = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const updatePost = (postId, post) => {
  return fetch(`${api}/posts/${postId}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(post)
  }).then(data => data.json());
};

export const deletePost = postId => {
  return fetch(`${api}/posts/${postId}`, {
    method: "DELETE",
    headers
  }).then(res => res);
};

export const getComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

/* ----------COMMENTS-------------  */

export const getComment = commentId =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const setComment = comment => {
  return fetch(`${api}/comments/`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  }).then(response => response.json());
};

export const updateComment = (commentId, comment) =>
  fetch(`${api}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(comment)
  }).then(data => data.json());

export const deleteComment = commentId => {
  return fetch(`${api}/comments/${commentId}`, {
    method: "DELETE",
    headers
  }).then(response => response.json());
};

export const setVoteComment = (commentId, option) => {
  return fetch(`${api}/comments/${commentId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  }).then(data => data.json());
};
