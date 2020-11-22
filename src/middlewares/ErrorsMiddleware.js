'use strict';

module.exports = (error, req, res) => {
  const { status = 500, message = 'Error' } = error;

  return res.status(status).send({ error: { message } });
};
