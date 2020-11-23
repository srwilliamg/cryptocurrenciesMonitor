'use strict';

const CoinsControllers = module.exports;

const CoinsServices = require('../services/CoinsServices');

CoinsControllers.getCoinsList = async (req, res) => {
  const { user_id: userId } = req;

  const currency = await CoinsServices.getCoinsList(userId);

  res.send(currency);
};
