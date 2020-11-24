'use strict';

const { user: UserModel } = require('@models/index');

const UsersServices = module.exports;

UsersServices.getUserCoins = async ({ id: userId }) => {
  const user = await UserModel.findByPk(userId);
  return user.getCoins();
};

UsersServices.createUser = async (userData) => {
  const createdUser = await UserModel.create(userData);

  return createdUser.getPublicData();
};
