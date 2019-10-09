/* eslint-disable func-names */
/* eslint-disable template-curly-spacing */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable comma-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import axios from 'axios';

const url = 'https://express-training.herokuapp.com/api/';

export const login = function (data) {
  return axios
    .post(`${url }user/login`, data)
    .then((response) => response.data)
    .catch((error) => error);
};

export const getTrainess = function (skip,limit) {
  return axios
    .get(`${url }/trainee?limit=${limit}&skip=${skip}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export const addTrainee = function (data) {
  return axios
    .post(`${url}/trainee`,data)
    .then((response) => response.data).catch((error) => error);
};

export const editTrainee = function (data) {
  return axios
    .put(`${url}/trainee`,data)
    .then((response) => response.data).catch((error) => error);
};

export const deleteTrainee = function (data) {
  return axios
    .delete(`${url}/trainee/${data.originalId}`)
    .then((response) => response.data).catch((error) => error);
};
