'use strict';

const request = require(`supertest`);
const {init} = require(`../cli/server`);
let server;
let data;
let existingOffer;
const getMockData = require(`../lib/get-mock-data`);

describe(`Offers API end-points`, () => {
  beforeAll(async () => {
    server = await init();
    data = await getMockData();
    existingOffer = data[0];
  }); 

  const falseCommentId = `8nikmas8`;

  const falseOfferId = `8nikmas8`;
  const trueOffer = {
    category: [`Журналы`],
    description: `Продаю с болью в сердце... Это настоящая находка для коллекционера! Даю недельную гарантию. Если найдёте дешевле — сброшу цену.`,
    picture: `item05.jpg`,
    title: `Продам приставку Sony Playstation 6`,
    type: `SALE`,
    sum: 4898
  };

  const falseOffer = {
    category: [`Журналы`],
    description: `Продаю с болью в сердце... Это настоящая находка для коллекционера! Даю недельную гарантию. Если найдёте дешевле — сброшу цену.`,
    title: `Продам приставку Sony Playstation 6`,
    type: `SALE`,
    sum: 4898
  };

  const trueComment = {
    text: `Крутотень конечно!`
  };

  const falseComment = {
    smth: `#$$$$#`
  };

  test(`GET /api/offers: should be 200`, async () => {
    const res = await request(server)
      .get(`/api/offers`);
    expect(res.statusCode).toBe(200);
  });

  test(`GET /api/offers/trueOfferID: should be 200`, async () => {
    const res = await request(server)
      .get(`/api/offers/${existingOffer.id}`);
    expect(res.statusCode).toBe(200);
  });

  test(`GET /api/offers/falseOfferID: should be 404`, async () => {
    const res = await request(server)
      .get(`/api/offers/${falseOfferId}`);
    expect(res.statusCode).toBe(404);
  });

  test(`POST /api/offers/: should be 201`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send(trueOffer);
    expect(res.statusCode).toBe(201);
  });

  test(`POST /api/offers/: should be 400, the inappropriate data`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send(falseOffer);
    expect(res.statusCode).toBe(400);
  });

  test(`PUT /api/offers/trueOfferID: should be 200 (true offer)`, async () => {
    const res = await request(server)
      .put(`/api/offers/${existingOffer.id}`)
      .send(trueOffer);
    expect(res.statusCode).toBe(200);
  });

  test(`PUT /api/offers/falseOfferID: should be 404 (true offer)`, async () => {
    const res = await request(server)
      .put(`/api/offers/${falseOfferId}`)
      .send(trueOffer);
    expect(res.statusCode).toBe(404);
  });

  test(`PUT /api/offers/trueOfferID: should be 400 (false offer)`, async () => {
    const res = await request(server)
      .put(`/api/offers/${existingOffer.id}`)
      .send(falseOffer);
    expect(res.statusCode).toBe(400);
  });

  test(`DELETE /api/offers/trueOfferID: should be 200`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${existingOffer.id}`)
    expect(res.statusCode).toBe(200);
  });

  test(`DELETE /api/offers/falseOfferID: should be 404`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${falseOfferId}`)
    expect(res.statusCode).toBe(404);
    existingOffer = data[1];
  });

  test(`GET /api/offers/trueOfferID/comments: should be 200`, async () => {
    const res = await request(server)
      .get(`/api/offers/${existingOffer.id}/comments`);
    expect(res.statusCode).toBe(200);
  });

  test(`GET /api/offers/falseOfferID/comments: should be 404`, async () => {
    const res = await request(server)
      .get(`/api/offers/${falseOfferId}/comments`);
    expect(res.statusCode).toBe(404);
  });

  test(`POST /api/offers/trueOfferID/comments: should be 201 (true comment)`, async () => {
    const res = await request(server)
      .post(`/api/offers/${existingOffer.id}/comments`)
      .send(trueComment);
    expect(res.statusCode).toBe(201);
  });

  test(`POST /api/offers/falseOfferID/comments: should be 404 (true comment)`, async () => {
    const res = await request(server)
      .post(`/api/offers/${falseOfferId}/comments`)
      .send(trueComment);
    expect(res.statusCode).toBe(404);
  });

  test(`POST /api/offers/trueOfferID/comments: should be 400 (false comment)`, async () => {
    const res = await request(server)
      .post(`/api/offers/${existingOffer.id}/comments`)
      .send(falseComment);
    expect(res.statusCode).toBe(400);
  });

  test(`DELETE /api/offers/trueOfferID/comments/trueCommentID: should be 200`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${existingOffer.id}/comments/${existingOffer.comments[0].id}`);
    expect(res.statusCode).toBe(200);
  });

  test(`DELETE /api/offers/falseOfferID/comments/trueCommentID: should be 404`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${falseOfferId}/comments/${existingOffer.comments[0].id}`);
    expect(res.statusCode).toBe(404);
  });

  test(`DELETE /api/offers/trueOfferID/comments/falseCommentID: should be 404`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${existingOffer.id}/comments/${falseCommentId}`);
    expect(res.statusCode).toBe(404);
  });

});
