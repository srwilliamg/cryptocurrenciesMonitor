'use strict';

require('module-alias/register');

const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');

const server = require('@src/server');

chai.use(chaiHttp);

const HEALTH_CHECK_PATH = '/health-check';

describe('Health check Controllers test', () => {
  it('Should work correctly', async () => {
    const { status, body } = await chai.request(server).get(HEALTH_CHECK_PATH);

    assert.deepStrictEqual(body, { message: 'ok' });
    assert.strictEqual(status, 200);
  });
});
