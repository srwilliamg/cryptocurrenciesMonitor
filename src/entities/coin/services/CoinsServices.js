'use strict';

const axios = require('axios');

const CurrencyServices = module.exports;

CurrencyServices.getCoinsList = async (userId) => {
  const coinsList = await axios.get('/coins/list');
  return coinsList;
};
