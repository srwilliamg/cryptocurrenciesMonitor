'use strict';

const express = require('express');

const { requestHandler } = require('@utils/HttpUtils');

const CoinsControllers = require('./controllers/CoinsControllers');

const CurrencyRouter = express.Router();

CurrencyRouter.get('/', requestHandler(CoinsControllers.getCoinsList));
CurrencyRouter.post('/:coinId/', requestHandler(CoinsControllers.createCoin));

module.exports = CurrencyRouter;
