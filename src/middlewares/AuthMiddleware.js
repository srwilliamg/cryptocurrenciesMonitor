'use strict';

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;
const User = require('@models/index').user;
const { UnauthorizedError } = require('@utils/ErrorUtils');

const auth = async (req, res, next) => {
  const header = req.header('Authorization');

  if (!header) next(new UnauthorizedError());

  const token = header.replace('Bearer ', '');
  const decoded = jwt.verify(token, SECRET_KEY);

  const user = await User.findOne({ where: { idUser: decoded.idUser, token } });

  if (!user) {
    next(new UnauthorizedError());
  }

  req.token = token;
  req.user = user;
  next();
};

module.exports = auth;
