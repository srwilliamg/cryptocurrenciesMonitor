'use strict';

const { Model } = require('sequelize');

const uniqueCoinId = async (CoinModel, value, userId, next) => {
  const exist = await CoinModel.findOne({
    where: { user_id: userId, coin_id: value },
    attributes: ['coin_id']
  });

  if (exist) next(`You already have a coin type: ${value}`);

  next();
};

module.exports = (sequelize, DataTypes) => {
  class coin extends Model {
    static associate(models) {
      coin.belongsTo(models.user, {
        foreignKey: 'user_id'
      });
    }
  }

  coin.init({
    coin_id: {
      type: DataTypes.STRING,
      validate: {
        // eslint-disable-next-line func-names
        isUnique: function (value, next) {
          const { user_id: userId } = this;
          return uniqueCoinId(coin, value, userId, next);
        }
      }
    },
    symbol: DataTypes.STRING,
    price_ars: DataTypes.FLOAT,
    price_usd: DataTypes.FLOAT,
    price_eur: DataTypes.FLOAT,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    last_updated: DataTypes.DATE
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: true
  });

  return coin;
};
