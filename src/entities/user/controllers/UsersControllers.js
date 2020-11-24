'use strict';

const UsersControllers = module.exports;

const UsersServices = require('../services/UsersServices');

UsersControllers.getUserCoins = async (req, res) => {
  const { user } = req;
  const coins = await UsersServices.getUserCoins(user);

  res.send(coins);
};

UsersControllers.createUser = async (req, res) => {
  const { body: userData } = req;

  const createdUser = await UsersServices.createUser(userData);

  res.send(createdUser);
};
