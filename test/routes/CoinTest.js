'use strict';

require('module-alias/register');

const app = require('@src/app');
const TokenUtils = require('@utils/TokenUtils');

const chai = require('chai');
const chaiHttp = require('chai-http');
const sandbox = require('sinon').createSandbox();
const axios = require('axios');

const databaseUtils = require('../testUtils/databaseUtils');

const { expect } = chai;
const YocoinResponse = require('../data/yocoinResponse.json');

chai.use(chaiHttp);

const USER_PATH = '/coins';

describe('User test', () => {
  beforeEach(async () => {
    await databaseUtils.insertData();
  });

  describe('POST coins', () => {
    it('Should work correctly', async () => {
      sandbox.stub(axios, 'get').resolves(YocoinResponse);

      const token = await TokenUtils.getToken({
        name: 'test1',
        last_name: 'test1',
        username: 'test1'
      });

      const { status, body } = await chai.request(app)
        .post(`${USER_PATH}/yocoin`)
        .set('Authorization', token);

      expect(status).to.equal(status, 200);
      expect(body.id).to.equal(6);
    });

    it('Should throw validation error', async () => {
      const token = await TokenUtils.getToken({
        name: 'William',
        last_name: 'Salazar',
        username: 'will'
      });

      const response = await chai.request(app)
        .post(`${USER_PATH}/yocoin`)
        .set('Authorization', token);

      const { status, body: { error: { message } } } = response;

      expect(status).to.equal(status, 200);
      expect(message).to.equal('Validation error: You already have a coin type: yocoin');
    });
  });
});
