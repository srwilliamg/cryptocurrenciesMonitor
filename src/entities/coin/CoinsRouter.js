'use strict';

const express = require('express');

const { requestHandler } = require('@utils/HttpUtils');
const AuthMiddleware = require('@middlewares/AuthMiddleware');

const CoinsControllers = require('./controllers/CoinsControllers');

const CurrencyRouter = express.Router();

CurrencyRouter.get('/', AuthMiddleware, requestHandler(CoinsControllers.getCoinsList));

module.exports = CurrencyRouter;
