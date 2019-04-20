export const sortByScore = (a, b) => {
  return a.voteScore - b.voteScore;
};
export const sortByTimestamp = (a, b) => {
  return a.timestamp - b.timestamp;
};
