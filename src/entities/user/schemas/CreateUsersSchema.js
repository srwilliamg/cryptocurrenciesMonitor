'use strict';

module.exports = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    last_name: { type: 'string' },
    username: { type: 'string' },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 40,
      pattern: '^[A-Za-z0-9]*$'
    },
    preferred_currency: {
      type: 'string',
      pattern: 'euro|dolar|peso'
    }
  },
  require: ['name', 'last_name', 'username', 'password', 'preferred_currency'],
  additionalProperties: false
};
