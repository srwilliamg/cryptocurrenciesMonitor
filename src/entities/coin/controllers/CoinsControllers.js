'use strict';

const SchemaUtils = require('@utils/SchemaUtils');

const CoinsServices = require('../services/CoinsServices');
const CreateCoinSchema = require('../schemas/CreateCoinSchema');
const DeleteCoinSchema = require('../schemas/DeleteCoinSchema');

const CoinsControllers = module.exports;

CoinsControllers.getCoinsList = async (req, res) => {
  const coinList = await CoinsServices.getCoinsList();

  res.send(coinList);
};

CoinsControllers.createCoin = async (req, res) => {
  const { user, params, params: { coinId } } = req;

  SchemaUtils.validateSchema(CreateCoinSchema, params);

  const currency = await CoinsServices.createCoin(user, coinId);

  res.send(currency);
};

CoinsControllers.deleteCoin = async (req, res) => {
  const { user, params, params: { coinId } } = req;

  SchemaUtils.validateSchema(DeleteCoinSchema, params);

  await CoinsServices.deleteCoin(user, coinId);

  res.status(204).send();
};
