'use strict';

const SchemaUtils = require('@utils/SchemaUtils');
const { NAMES, SYMBOL } = require('@constants/CurrencyConstants');

const UsersServices = require('../services/UsersServices');
const CreateUsersSchema = require('../schemas/CreateUsersSchema');
const GetUsersCoinsSchema = require('../schemas/GetUsersCoinsSchema');
const { BadRequestError } = require('@src/utils/ErrorUtils');

const UsersControllers = module.exports;

UsersControllers.getUserCoins = async (req, res) => {
  const { user, query: { limit } } = req;

  if (!limit) throw new BadRequestError('You should send \'limit\' query param');

  SchemaUtils.validateSchema(GetUsersCoinsSchema, +limit);

  const coins = await UsersServices.getUserCoins(user, +limit);

  res.send(coins);
};

UsersControllers.createUser = async (req, res) => {
  const { body: userData } = req;

  SchemaUtils.validateSchema(CreateUsersSchema, userData);

  const { preferred_currency: pc } = userData;

  if (pc === NAMES.EURO) userData.preferred_currency = SYMBOL.EURO;
  else if (pc === NAMES.DOLAR) userData.preferred_currency = SYMBOL.DOLAR;
  else userData.preferred_currency = SYMBOL.ARGENTINE_PESO;

  const createdUser = await UsersServices.createUser(userData);

  res.send(createdUser);
};
