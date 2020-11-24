'use strict';

const { USER } = require('../constants/DatabaseConstants');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(USER, [{
      name: 'John',
      last_name: 'Doe',
      password: '1234',
      username: 'will',
      preferred_currency: 'ars',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(USER, null, {});
  }
};
