'use strict';

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;
const { user: UserModel } = require('@models/index');
const { NotFoundError } = require('./ErrorUtils');

const AuthUtils = module.exports;

const BEARER = 'Bearer ';

AuthUtils.verifyToken = async (token) => {
  const filteredToken = token.replace(BEARER, '');

  const decoded = jwt.verify(filteredToken, SECRET_KEY);

  const { iat: _, exp, ...payload } = decoded;

  const user = await UserModel.findOne({ where: payload });

  if (!user) {
    throw new NotFoundError();
  }

  return { ...user.getPublicData(), filteredToken };
};
