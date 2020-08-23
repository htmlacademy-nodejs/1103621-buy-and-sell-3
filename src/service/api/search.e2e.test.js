'use strict';

const request = require(`supertest`);
const {server} = require(`../cli/server`);
const getMockData = require(`../lib/get-mock-data`);

describe(`Search API end-points`, () => {
  const data = getMockData();

  const trueTitle = data[0].title;
  const falseTitle = `ХЗХЗХЗ`;

  test(`GET /api/search?query=trueTitle: should be 200`, async () => {
    const res = await request(server).get(encodeURI(`/api/search?query=${trueTitle}`));
    expect(res.statusCode).toBe(200);
  });

  test(`GET /api/search?query=falseTitle: should be 404`, async () => {
    const res = await request(server).get(encodeURI(`/api/search?query=${falseTitle}`));
    expect(res.statusCode).toBe(404);
  });
});