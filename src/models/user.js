'use strict';

const TokenUtils = require('@utils/TokenUtils');

const { Model } = require('sequelize');

const uniqueUsername = user => {
  return async (value, next) => {
    const exist = await user.findOne({
      where: { username: value },
      attributes: ['username']
    });

    if (exist) next(`username '${value}' is already in use`);

    next();
  };
};

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    async generateToken() {
      // eslint-disable-next-line camelcase
      const { id, username, last_name } = this;
      return TokenUtils.getToken({ id, username, last_name });
    }

    getPublicData() {
      const userData = this.toJSON();
      const { password: _, ...cleanedUser } = userData;
      return cleanedUser;
    }

    static associate(models) {
      user.hasMany(models.coin, {
        foreignKey: 'user_id',
        as: 'coins'
      });
    }
  }

  user.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: uniqueUsername(user)
      }
    },
    password: DataTypes.STRING,
    preferred_currency: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: true
  });

  return user;
};
