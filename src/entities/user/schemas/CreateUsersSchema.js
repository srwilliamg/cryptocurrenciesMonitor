'use strict';

module.exports = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    last_name: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    preferred_currency: { type: 'string' }
  },
  require: ['name', 'last_name', 'username', 'password', 'preferred_currency'],
  additionalProperties: false
};
