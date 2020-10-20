'use strict';

const {
  Router
} = require(`express`);
const mainRouter = new Router();
const axios = require(`axios`);

const PATH_TO_SERVICE = `http://localhost:3000`;
const NUMBER_OF_OFFERS_FOR_THE_NEWEST = 8;
const NUMBER_OF_OFFERS_FOR_THE_MOST_DESCUSSED = 4;
const OrderType = {
  NEWEST: `newest`,
  MOSTDISCUSSED: `mostDiscussed`,
};

const getOffers = async (amount, order) => {
  const offers = await axios.get(`${PATH_TO_SERVICE}/api/offers?amount=${amount}&order=${order}`);

  return offers;
};

const findOffersByQueryString = async (queryStr) => {
  try {
    const foundOffers = await axios.get(encodeURI(`${PATH_TO_SERVICE}/api/search?query=${queryStr}`));
    return foundOffers.data;
  } catch (error) {
    return [];
  }

};

mainRouter.get(`/`, async (req, res) => {
  const offersForTheNewest = await getOffers(NUMBER_OF_OFFERS_FOR_THE_NEWEST, OrderType.NEWEST);
  const offersForTheMostDiscussed = await getOffers(NUMBER_OF_OFFERS_FOR_THE_MOST_DESCUSSED, OrderType.MOSTDISCUSSED);
  res.render(`main`, {
    offersForTheNewest: offersForTheNewest.data,
    offersForTheMostDiscussed: offersForTheMostDiscussed.data
  });

});
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, async (req, res) => {
  const offersForTheNewest = await getOffers(NUMBER_OF_OFFERS_FOR_THE_NEWEST, OrderType.NEWEST);
  const offers = await findOffersByQueryString(req.query.search);
  res.render(`search-result`, {
    offers,
    offersForTheNewest: offersForTheNewest.data,
  });

});


module.exports = mainRouter;
