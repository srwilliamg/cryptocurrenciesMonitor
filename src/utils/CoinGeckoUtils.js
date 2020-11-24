/* eslint-disable lines-around-directive */
// eslint-disable-next-line max-classes-per-file
'use strict';

const axios = require('axios');

const CoinGeckoUtils = module.exports;

CoinGeckoUtils.getAllCoins = async () => {
  const coinsList = await axios.get('/coins/list');
  return coinsList;
};

CoinGeckoUtils.getCoinDetail = async (coinId) => {
  const coinsDetail = await axios.get(`/coins/${coinId}`);
  return coinsDetail;
};
