'use strict';

const jwt = require('jsonwebtoken');

const TokenUtils = module.exports;

const EXPIRIES = 60 * 60;
const { SECRET_KEY } = process.env;

TokenUtils.getToken = async (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRIES });
};
