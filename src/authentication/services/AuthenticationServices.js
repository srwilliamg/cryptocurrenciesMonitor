'use strict';

const { user: UserModel, blacklist: BlacklistModel } = require('@models/index');
const { UnauthorizedError, BadRequestError, ForbiddenError } = require('@utils/ErrorUtils');
const AuthUtils = require('@utils/AuthUtils');

const AuthenticationServices = module.exports;

AuthenticationServices.login = async (username, password) => {
  const user = await UserModel.findOne({ where: { username, password } });

  if (!user) throw new UnauthorizedError();

  const token = await user.generateToken();
  const { password: _, ...cleanedUser } = user.toJSON();

  return { ...cleanedUser, token };
};

AuthenticationServices.logout = async (token) => {
  const tokenExist = await BlacklistModel.findOne({ where: { token } });

  if (tokenExist) throw new BadRequestError('User already logged out');

  const insertToken = await BlacklistModel.create({ token });
  return insertToken;
};

AuthenticationServices.authenticateToken = async (token) => {
  const user = await AuthUtils.verifyToken(token);

  const tokenExist = await BlacklistModel.findOne({ where: { token } });

  if (tokenExist) throw new ForbiddenError('Not valid token');

  return user;
};
