'use strict';

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

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
      const token = jwt.sign({ id, username, last_name }, SECRET_KEY, { expiresIn: 60 * 60 });
      return token;
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
