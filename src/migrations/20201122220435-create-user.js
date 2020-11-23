'use strict';

const { USER } = require('../constants/DatabaseConstants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(USER, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      username: {
        isUnique: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      preferred_currency: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(USER);
  }
};
