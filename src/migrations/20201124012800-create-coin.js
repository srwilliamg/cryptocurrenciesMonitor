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
      coin_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      price_ars: {
        type: Sequelize.FLOAT
      },
      price_usd: {
        type: Sequelize.FLOAT
      },
      price_eur: {
        type: Sequelize.FLOAT
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
