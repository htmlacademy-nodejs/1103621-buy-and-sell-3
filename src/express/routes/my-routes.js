'use strict';

const {
  Router
} = require(`express`);
const myRouter = new Router();
const axios = require(`axios`);
const PATH_TO_SERVICE = `http://localhost:3000`;

const getAllOffers = async () => {
  const serviceResp = await axios.get(`${PATH_TO_SERVICE}/api/offers`);
  return serviceResp.data;
};

const getFirstTwoOffers = async () => {
  const firstThreeArticles = await getAllOffers();

  return firstThreeArticles.slice(0, 2);
};

myRouter.get(`/`, async (req, res) => {
  const allOffers = await getAllOffers();
  res.render(`tickets/my-tickets`, {
    allOffers
  });
});
myRouter.get(`/comments`, async (req, res) => {
  const offers = await getFirstTwoOffers();
  res.render(`comments`, {
    offers
  });
});

module.exports = myRouter;
