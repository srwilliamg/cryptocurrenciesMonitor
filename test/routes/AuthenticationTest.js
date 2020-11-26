'use strict';

require('module-alias/register');

const app = require('@src/app');
const TokenUtils = require('@utils/TokenUtils');

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const AuthenticationData = require('../data/AuthenticationData');
const databaseUtils = require('../testUtils/databaseUtils');

chai.use(chaiHttp);

const AUTHENTICATION_PATH = '/auth';

describe('Authentication test', () => {
  beforeEach(async () => {
    await databaseUtils.insertData();
  });

  describe('Login', () => {
    it('Should work correctly', async () => {
      const userLoginData = {
        username: 'will',
        password: '1234'
      };

      const { status, body } = await chai.request(app)
        .post(`${AUTHENTICATION_PATH}/login`)
        .send(userLoginData);

      expect(status).to.equal(status, 200);
      expect(body.username).to.equal('will');
    });

    it('Should throw Unauthorized error', async () => {
      const notValidUserLoginData = {
        username: 'notExistingUser',
        password: '1546464646'
      };

      const response = await chai.request(app)
        .post(`${AUTHENTICATION_PATH}/login`)
        .send(notValidUserLoginData);

      const { status, body: { error: { message } } } = response;

      expect(status).to.equal(401);
      expect(message).to.equal('Unauthorized');
    });
  });

  describe('Logout', () => {
    it('Should work correctly', async () => {
      const userTokenData = {
        name: 'William',
        last_name: 'Salazar',
        username: 'will'
      };

      const token = await TokenUtils.getToken(userTokenData);

      const { status, body } = await chai.request(app)
        .post(`${AUTHENTICATION_PATH}/logout`)
        .send({ token });

      expect(status).to.equal(200);
      expect(body.id).to.equal(4);
    });

    it('Should throw \'user already logged out\'', async () => {
      const userLogoutData = {
        token: AuthenticationData.blackListToken
      };

      const { status, body: { error: { message } } } = await chai.request(app)
        .post(`${AUTHENTICATION_PATH}/logout`)
        .send(userLogoutData);

      expect(status).to.equal(status, 400);
      expect(message).to.equal('User already logged out');
    });
  });

  describe('Authenticate-token', () => {
    it('Should work correctly', async () => {
      const userTokenData = {
        name: 'William',
        last_name: 'Salazar',
        username: 'will'
      };

      const token = await TokenUtils.getToken(userTokenData);

      const { status, body } = await chai.request(app)
        .post(`${AUTHENTICATION_PATH}/authenticate-token`)
        .send({ token });

      expect(status).to.equal(200);
      expect(body.token).to.equal(token);
    });

    it('Should throw \'jwt expired\' error', async () => {
      const userLogoutData = {
        token: AuthenticationData.blackListToken
      };

      const { status, body: { error: { message } } } = await chai.request(app)
        .post(`${AUTHENTICATION_PATH}/authenticate-token`)
        .send(userLogoutData);

      expect(status).to.equal(status, 500);
      expect(message).to.equal('jwt expired');
    });
  });
});
