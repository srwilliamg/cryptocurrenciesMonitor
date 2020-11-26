'use strict';

require('module-alias/register');

const app = require('@src/app');
const TokenUtils = require('@utils/TokenUtils');
const { coin: CoinModel } = require('@models/index');

const chai = require('chai');
const chaiHttp = require('chai-http');
const sandbox = require('sinon').createSandbox();
const axios = require('axios');

const databaseUtils = require('../testUtils/databaseUtils');

const { expect } = chai;
const YocoinResponse = require('../data/yocoinResponse.json');

chai.use(chaiHttp);

const userWithCoins = {
  name: 'William',
  last_name: 'Salazar',
  username: 'will'
};

const coinListResponse = [
  {
    id: '01coin',
    symbol: 'zoc',
    name: '01coin'
  },
  {
    id: '0-5x-long-algorand-token',
    symbol: 'algohalf',
    name: '0.5X Long Algorand Token'
  },
  {
    id: '0-5x-long-altcoin-index-token',
    symbol: 'althalf',
    name: '0.5X Long Altcoin Index Token'
  }
];

const COINS_PATH = '/coins';

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
        .post(`${COINS_PATH}/yocoin`)
        .set('Authorization', token);

      expect(status).to.equal(status, 200);
      expect(body.id).to.equal(6);
    });

    it('Should throw validation error', async () => {
      const token = await TokenUtils.getToken(userWithCoins);

      const response = await chai.request(app)
        .post(`${COINS_PATH}/yocoin`)
        .set('Authorization', token);

      const { status, body: { error: { message } } } = response;

      expect(status).to.equal(status, 200);
      expect(message).to.equal('Validation error: You already have a coin type: yocoin');
    });
  });

  describe('DELETE coin', () => {
    it('Should work correctly', async () => {
      const token = await TokenUtils.getToken(userWithCoins);

      const { status } = await chai.request(app)
        .delete(`${COINS_PATH}/1`)
        .set('Authorization', token);

      const existingCoin = await CoinModel.findOne({ where: { id: 1, user_id: 1 } });

      expect(status).to.equal(status, 204);
      expect(existingCoin).to.equal(null);
    });

    it('Should throw validation error', async () => {
      const token = await TokenUtils.getToken({
        name: 'test1',
        last_name: 'test1',
        username: 'test1'
      });

      const response = await chai.request(app)
        .delete(`${COINS_PATH}/3`)
        .set('Authorization', token);

      const { status, body: { error: { message } } } = response;

      expect(status).to.equal(status, 404);
      expect(message).to.equal('Coin not found');
    });
  });

  describe('Get all coins', () => {
    it('Should work correctly', async () => {
      sandbox.restore();
      sandbox.stub(axios, 'get').resolves(coinListResponse);
      const token = await TokenUtils.getToken(userWithCoins);

      const { status, body } = await chai.request(app)
        .get(`${COINS_PATH}/`)
        .set('Authorization', token);

      expect(status).to.equal(status, 200);
      expect(body).to.deep.equal(coinListResponse);
    });
  });
});
