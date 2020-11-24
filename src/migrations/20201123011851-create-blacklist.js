'use strict';

const { BLACKLIST } = require('../constants/DatabaseConstants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(BLACKLIST, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(BLACKLIST);
  }
};
