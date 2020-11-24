'use strict';

const { UnauthorizedError } = require('@utils/ErrorUtils');
const AuthUtils = require('@utils/AuthUtils');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) throw new UnauthorizedError();

    const user = await AuthUtils.verifyToken(token);

    req.token = user.token;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
