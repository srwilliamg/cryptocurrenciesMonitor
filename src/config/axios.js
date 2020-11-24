'use strict';

const { HttpError } = require('@src/utils/ErrorUtils');
/* eslint-disable no-console */
const axios = require('axios');

const axiosConfig = module.exports;

axiosConfig.initAxios = () => {
  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

  const getResponse = response => {
    const { data: responseData } = response;
    // console.info('Intercept response: ', responseData);
    return responseData;
  };

  const rejectResponse = error => {
    const { message, response: { status } } = error;
    const messageError = { status, message };

    if (!status && !message) return Promise.reject(new HttpError());

    console.error('Intercept: ', messageError);
    return Promise.reject(messageError);
  };

  axios.interceptors.response.use(getResponse, rejectResponse);
};
