'use strict';

const { Model } = require('sequelize');

const uniqueCoinId = coin => {
  return async (value, next) => {
    const exist = await coin.findOne({
      where: { coin_id: value },
      attributes: ['coin_id']
    });

    if (exist) next(`You already have a coin type: ${value}`);

    next();
  };
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
        isUnique: uniqueCoinId(coin)
      }
    },
    symbol: DataTypes.STRING,
    price: DataTypes.FLOAT,
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
