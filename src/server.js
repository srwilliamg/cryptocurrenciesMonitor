'use strict';

require('dotenv').config();
require('module-alias/register');

const express = require('express');
const { initAxios } = require('@config/axios');

initAxios();

const { healthCheck } = require('@healthCheck/controllers/HealthCheckControllers');
const ErrorsMiddleware = require('@middlewares/ErrorsMiddleware');

const { PORT = 3000 } = process.env;

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/health-check', healthCheck);
app.use(routes);
app.use(ErrorsMiddleware);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
