'use strict';

const express = require('express');

const { requestHandler } = require('@utils/HttpUtils');

const AuthenticationControllers = require('./controllers/AuthenticationControllers');

const AuthenticationRouter = express.Router();

AuthenticationRouter.post('/login', requestHandler(AuthenticationControllers.login));
AuthenticationRouter.post('/logout', requestHandler(AuthenticationControllers.logout));
AuthenticationRouter.post('/authenticate-token', requestHandler(AuthenticationControllers.authenticateToken));

module.exports = AuthenticationRouter;
