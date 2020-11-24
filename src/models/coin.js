'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class coin extends Model {
    static associate(models) {
      coin.belongsTo(models.user, {
        foreignKey: 'user_id'
      });
    }
  }

  coin.init({
    symbol: DataTypes.STRING,
    price: DataTypes.STRING,
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
