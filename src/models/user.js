'use strict';

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    async generateToken() {
      // eslint-disable-next-line camelcase
      const { id, username, last_name } = this;
      const token = jwt.sign({ id, username, last_name }, SECRET_KEY, { expiresIn: 60 * 60 });
      return token;
    }

    getPublicData() {
      const { password: _, ...cleanedUser } = this.toJSON();
      return cleanedUser;
    }

    static associate() {
      // define association here
    }
  }

  user.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    preferred_currency: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: true
  });

  return user;
};
