'use strict';

const express = require('express');

const { requestHandler } = require('@utils/HttpUtils');

const CoinsControllers = require('./controllers/CoinsControllers');

const CoinRouter = express.Router();

CoinRouter.get('/', requestHandler(CoinsControllers.getCoinsList));
CoinRouter.post('/:coinId', requestHandler(CoinsControllers.createCoin));
CoinRouter.delete('/:coinId(\\d+)', requestHandler(CoinsControllers.deleteCoin));

module.exports = CoinRouter;
