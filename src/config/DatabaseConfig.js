'use strict';

require('dotenv').config();

const {
  DB_HOST, DB_NAME, DB_USER, DB_SECRET, DB_PORT, DB_DIALECT
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_SECRET,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false
  },
  test: {
    username: DB_USER,
    password: DB_SECRET,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false
  },
  production: {
    username: DB_USER,
    password: DB_SECRET,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false
  }
};
