/* eslint-disable no-unused-vars */
import Moment from 'moment';

export const PUBLIC_IMAGE_FOLDER = '../images/';
export const DEFAULT_BANNER_IMAGE = '../images/banners/default.png';
export const SportTypes = ['Cricket', 'Football'];
export const PlayerSkills = [{ Cricket: ['Batsman', 'Baller', 'Wicket Keeper', 'All Rounder'], Football: ['Defender', 'Striker'] }];

export const getDateFormatted = (date) => {

return Moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
};
