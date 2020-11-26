'use strict';

require('module-alias/register');

const {
  user: UserModel, blacklist: BlacklistModel, coin: CoinModel, sequelize
} = require('@models/index');

const { USER, BLACKLIST, COIN } = require('@constants/DatabaseConstants');

const { user: usersData } = require('../data/userData.json');
const { coin: coinData } = require('../data/coinData.json');
const { blacklist: blacklistData } = require('../data/blacklistData.json');

const resetSequence = async (table) => {
  await sequelize.query(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`);
};

const databaseUtils = module.exports;

databaseUtils.insertData = async () => {
  resetSequence(USER);
  resetSequence(COIN);
  resetSequence(BLACKLIST);

  await CoinModel.destroy({ truncate: true, cascade: true });
  await UserModel.destroy({ truncate: true, cascade: true });
  await BlacklistModel.destroy({ truncate: true, cascade: true });

  await UserModel.bulkCreate(usersData);
  await CoinModel.bulkCreate(coinData);
  await BlacklistModel.bulkCreate(blacklistData);
};
