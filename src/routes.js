'use strict';

const express = require('express');

const AuthenticationRouter = require('@authentication/AuthenticationRouter');
const CoinsRouter = require('@src/entities/coin/CoinsRouter');

const AuthMiddleware = require('@middlewares/AuthMiddleware');

const Routes = express.Router();

Routes.use('/auth', AuthenticationRouter);
Routes.use('/coins', AuthMiddleware, CoinsRouter);

module.exports = Routes;
