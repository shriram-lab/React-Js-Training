/* eslint-disable func-names */
const getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

const getNextRoundRobin = function (total, current) {
  if (total === current) {
    return 0;
  } if (total === (current + 1)) {
    return 0;
  }

  return current + 1;
};

export default { getRandomNumber, getNextRoundRobin };
