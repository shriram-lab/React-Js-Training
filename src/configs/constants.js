/* eslint-disable no-unused-vars */
import Moment from 'moment';

export const PUBLIC_IMAGE_FOLDER = '../images/';
export const DEFAULT_BANNER_IMAGE = '../images/banners/default.png';
export const SportTypes = ['Cricket', 'Football'];
export const PlayerSkills = [
  {
    Cricket: ['Batsman', 'Baller', 'Wicket Keeper', 'All Rounder'],
    Football: ['Defender', 'Striker'],
  },
];

// eslint-disable-next-line arrow-body-style
export const getDateFormatted = (date) => {
  return Moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
};
export const ascSort = (name) => (a, b) => {
  if (a[name] < b[name]) {
    return -1;
  }
  if (a[name] > b[name]) {
    return 1;
  }
  return 0;
};

export const descSort = (name) => (a, b) => {
  if (a[name] > b[name]) {
    return -1;
  }
  if (a[name] < b[name]) {
    return 1;
  }
  return 0;
};
