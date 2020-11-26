'use strict';

require('module-alias/register');

const app = require('@src/app');
const TokenUtils = require('@utils/TokenUtils');

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const databaseUtils = require('../testUtils/databaseUtils');

chai.use(chaiHttp);

const USER_PATH = '/users';

describe('User test', () => {
  const userTokenData = {
    name: 'William',
    last_name: 'Salazar',
    username: 'will'
  };

  beforeEach(async () => {
    await databaseUtils.insertData();
  });

  describe('GET users coins', () => {
    beforeEach(async () => {
      await databaseUtils.insertData();
    });

    it('Should work correctly', async () => {
      const token = await TokenUtils.getToken(userTokenData);

      const { status, body } = await chai.request(app)
        .get(`${USER_PATH}/coins`)
        .set('Authorization', token)
        .query({ limit: 30 });

      expect(status).to.equal(status, 200);
      expect(body.length).to.equal(5);
    });

    it('Should throw \'You should send \'limit\' query param\'', async () => {
      const token = await TokenUtils.getToken(userTokenData);

      const response = await chai.request(app)
        .get(`${USER_PATH}/coins`)
        .set('Authorization', token);

      const { status, body: { error: { message } } } = response;

      expect(status).to.equal(400);
      expect(message).to.equal('You should send \'limit\' query param');
    });

    it('Should throw limit \'should be >= 26\'', async () => {
      const token = await TokenUtils.getToken(userTokenData);

      const response = await chai.request(app)
        .get(`${USER_PATH}/coins`)
        .set('Authorization', token)
        .query({ limit: 1 });

      const { status, body: { error: { message } } } = response;

      expect(status).to.equal(400);
      expect(message).to.equal(' should be >= 26');
    });
  });

  describe('POST users', () => {
    const newUserData = {
      name: 'test3',
      last_name: 'test3',
      password: '1249i98fdj',
      preferred_currency: 'peso'
    };

    beforeEach(async () => {
      await databaseUtils.insertData();
    });

    it('Should work correctly', async () => {
      const { status, body } = await chai.request(app)
        .post(`${USER_PATH}`)
        .send({ ...newUserData, username: 'test5' });

      expect(status).to.equal(status, 200);
      expect(body.id).to.equal(5);
    });

    it('Should throw \'Validation error: username \'test3\' is already in use\'', async () => {
      const response = await chai.request(app)
        .post(`${USER_PATH}`)
        .send({ ...newUserData, username: 'test3' });

      const { status, body: { error: { message } } } = response;

      expect(status).to.equal(500);
      expect(message).to.equal('Validation error: username \'test3\' is already in use');
    });
  });
});
