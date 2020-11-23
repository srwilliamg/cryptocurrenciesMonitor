'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  const { status = 500, message = 'Error' } = error;

  return res.status(status).send({ error: { message } });
};
