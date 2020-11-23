'use strict';

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
    console.error('Intercept: ', error);
    return Promise.reject(error);
  };

  axios.interceptors.response.use(getResponse, rejectResponse);
};
