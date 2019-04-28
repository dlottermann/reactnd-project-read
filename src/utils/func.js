export const sortByScore = (a, b) => a.voteScore - b.voteScore;

export const sortByTimestamp = (a, b) => a.timestamp - b.timestamp;

export const generateUID = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

export const generateDateTime = () => Date.now();

export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);
