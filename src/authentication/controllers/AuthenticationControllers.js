'use strict';

const AuthenticationControllers = module.exports;

const AuthenticationServices = require('../services/AuthenticationServices');

AuthenticationControllers.login = async (req, res) => {
  const { body: { username, password } } = req;

  const userData = await AuthenticationServices.login(username, password);

  res.send(userData);
};

AuthenticationControllers.logout = async (req, res) => {
  const { body: { token } } = req;
  const logoutResponse = await AuthenticationServices.logout(token);

  res.send(logoutResponse);
};

AuthenticationControllers.authenticateToken = async (req, res) => {
  const { body: { token } } = req;

  const response = await AuthenticationServices.authenticateToken(token);

  res.send(response);
};
