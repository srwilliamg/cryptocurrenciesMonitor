'use strict';

const express = require('express');

const { requestHandler } = require('@utils/HttpUtils');
const AuthMiddleware = require('@middlewares/AuthMiddleware');

const UsersControllers = require('./controllers/UsersControllers');

const UsersRouter = express.Router();

UsersRouter.get('/coins', AuthMiddleware, requestHandler(UsersControllers.getUserCoins));
UsersRouter.post('/', requestHandler(UsersControllers.createUser));

module.exports = UsersRouter;
