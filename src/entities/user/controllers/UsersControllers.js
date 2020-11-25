'use strict';

const SchemaUtils = require('@utils/SchemaUtils');

const UsersServices = require('../services/UsersServices');
const CreateUsersSchema = require('../schemas/CreateUsersSchema');

const UsersControllers = module.exports;

UsersControllers.getUserCoins = async (req, res) => {
  const { user } = req;
  const coins = await UsersServices.getUserCoins(user);

  res.send(coins);
};

UsersControllers.createUser = async (req, res) => {
  const { body: userData } = req;

  SchemaUtils.validateSchema(CreateUsersSchema, userData);

  const createdUser = await UsersServices.createUser(userData);

  res.send(createdUser);
};
