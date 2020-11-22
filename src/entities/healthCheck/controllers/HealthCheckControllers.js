'use strict';

const HealthCheckControllers = module.exports;

HealthCheckControllers.healthCheck = (req, res) => {
  res.send({ message: 'ok' });
};
