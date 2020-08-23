'use strict';

const request = require(`supertest`);
const {server} = require(`../cli/server`);

describe(`Categories API end-points`, () => {
  test(`GET /api/categories: should be 200`, async () => {
    const res = await request(server).get(`/api/categories`);
    expect(res.statusCode).toBe(200);
  })
});