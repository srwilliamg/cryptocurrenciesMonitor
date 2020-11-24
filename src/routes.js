'use strict';

const express = require('express');

const AuthenticationRouter = require('@authentication/AuthenticationRouter');
const CoinsRouter = require('@coin/CoinsRouter');
const UsersRouter = require('@user/UsersRouter');

const AuthMiddleware = require('@middlewares/AuthMiddleware');

const Routes = express.Router();

Routes.use('/auth', AuthenticationRouter);
Routes.use('/coins', AuthMiddleware, CoinsRouter);
Routes.use('/users', UsersRouter);

module.exports = Routes;
