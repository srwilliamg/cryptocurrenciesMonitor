'use strict';

const CoinsControllers = module.exports;

const CoinsServices = require('../services/CoinsServices');

CoinsControllers.getCoinsList = async (req, res) => {
  const currency = await CoinsServices.getCoinsList();

  res.send(currency);
};

CoinsControllers.createCoin = async (req, res) => {
  const { user, params: { coinId } } = req;
  const currency = await CoinsServices.createCoin(user, coinId);

  res.send(currency);
};
