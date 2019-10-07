/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable comma-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import axios from 'axios';

const url = 'https://express-training.herokuapp.com/api/user/login';

function login(data) {
  return axios
    .post(url, data)
    .then((response) => response.data)
    .catch((error) => error);
}

export default login;
