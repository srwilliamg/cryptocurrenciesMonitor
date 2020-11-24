'use strict';

const { COIN, USER } = require('../constants/DatabaseConstants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(COIN, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: USER,
            key: 'user_id'
          },
          key: 'id'
        }
      },
      symbol: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.JSONB
      },
      last_updated: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable(COIN);
  }
};
