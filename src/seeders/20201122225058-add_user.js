'use strict';

const { user: { tableName: USER_TABLE_NAME } } = require('../constants/DatabaseConstants');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(USER_TABLE_NAME, [{
      name: 'John',
      last_name: 'Doe',
      password: '1234',
      username: 'will',
      preferred_currency: 'COP',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(USER_TABLE_NAME, null, {});
  }
};
