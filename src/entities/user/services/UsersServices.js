'use strict';

const { user: UserModel } = require('@models/index');

const UsersServices = module.exports;

UsersServices.getUserCoins = async ({ id: userId, preferred_currency: pc }, coinsLimit) => {
  const user = await UserModel.findByPk(userId);

  const columnsToSelect = ['id', 'coin_id', 'symbol', 'price_ars', 'price_usd', 'price_eur', 'name', 'image', 'last_updated'];

  return user.getCoins({
    attributes: columnsToSelect,
    order: [
      [`price_${pc}`, 'DESC']
    ],
    limit: coinsLimit
  });
};

UsersServices.createUser = async (userData) => {
  const createdUser = await UserModel.create(userData);

  return createdUser.getPublicData();
};
